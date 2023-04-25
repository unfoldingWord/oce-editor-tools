import { isNull } from 'lodash';
// import { Proskomma } from 'proskomma-cross';
import ProskommaInterface from '../classes/ProskommaInterface';
// import Epitelete from 'epitelete';
// import { PipelineHandler } from 'proskomma-json-tools';

export class Aligner {
    /**
     *
     * @param {String[]} sourceUsfm - source raw usfm, code lang and abbr
     * @param {String[]} targetUsfm - target raw usfm, code lang and abbr
     * @param {boolean} verbose
     */
    constructor({sourceUsfm=[], targetUsfm=[], verbose=false}) {

        this.proskommaInterface = new ProskommaInterface();
        if(!isNull(sourceUsfm[0])) {
            this.proskommaInterface.addRawDocument(sourceUsfm[0], sourceUsfm[1], sourceUsfm[2]);
            this.sourceUsfm = sourceUsfm[0];
        } else {
            this.sourceUsfm = "";
        }
        if(!isNull(targetUsfm[0])) {
            this.proskommaInterface.addRawDocument(targetUsfm[0], targetUsfm[1], targetUsfm[2]);
            this.targetUsfm = targetUsfm[0];
        } else {
            this.targetUsfm = "";
        }
        
        this.currentChapter = 0;
        this.currentVerse = 0;
        this.currentSourceSentence = [];
        this.currentSourceSentenceStr = "";
        this.currentTargetSentence = [];
        this.currentTargetSentenceStr = "";
        this.verbose = verbose;
        this.AlignementJSON={
            "sourceText": this.currentSourceSentenceStr,
            "targetText": this.currentTargetSentenceStr,
            "alignments": {}
        };
    }

    /**
     * 
     * @returns {string[]}
     */
    getCurrentTargetSentence() {
        return this.currentTargetSentence;
    }

    /**
     * 
     * @returns {string[]}
     */
    getCurrentSourceSentence() {
        return this.currentSourceSentence;
    }

    getCurrentChapter() {
        return this.currentChapter;
    }

    getCurrentVerse() {
        return this.currentVerse;
    }

    setCurrentChapter(chapterInt) {
        this.currentChapter = chapterInt;
    }

    setCurrentVerse(verseInt) {
        this.currentVerse = verseInt;
    }

    /**
     * 
     * @param {string[]|string} sentence the sentence for alignment
     */
    setCurrentSourceSentence(sentence) {
        if(typeof sentence === "object" && !isNull(sentence[0]) && typeof sentence[0] === "string") {
            this.currentSourceSentence = sentence;
        } else if (typeof sentence === "string") {
            this.currentSourceSentence = sentence.trim().split(/[ ,-]/g).filter(element => {
                return element.trim() !== "";
            });
            this.currentSourceSentenceStr = sentence;
        }
        this.AlignementJSON["sourceText"] = this.currentSourceSentenceStr;
    }

    /**
     * 
     * @param {string[]|string} sentence the sentence for alignment
     */
    setCurrentTargetSentence(sentence) {
        if(typeof sentence === "object" && !isNull(sentence[0]) && typeof sentence[0] === "string") {
            this.currentTargetSentence = sentence;
        } else if (typeof sentence === "string") {
            this.currentTargetSentence = sentence.trim().split(/\W+/g).filter(element => {
                return element.trim() !== "";
            });
            this.currentTargetSentenceStr = sentence;
        }
        this.AlignementJSON["targetText"] = this.currentTargetSentenceStr;
    }

    /**
     * Get a well formated JSON word alignment informations
     * @returns {JSON}
     */
    getAlignmentJSON() {
        return this.AlignementJSON;
    }

    addAlignment(sourceIndex, targetIndex) {
        // let ref = this.generateReference();
        console.log("this.currentSourceSentence == ", this.currentSourceSentence);
        console.log("this.currentTargetSentence == ", this.currentTargetSentence);
        let sWord = this.currentSourceSentence[sourceIndex];
        let tWord = this.currentTargetSentence[targetIndex];
        if(!this.AlignementJSON["alignments"][sWord]) {
            this.AlignementJSON["alignments"][sWord] = this.generateTemplateAlign(
                sWord,
                tWord,
                sourceIndex,
                targetIndex,
            );
        } else {
            this.AlignementJSON["alignments"][sWord]["targetWords"].push(tWord);
            this.thisAlignementJSON["alignments"][sWord]["targetIndexes"].push(targetIndex);
        }
    }

    removeAlignment(sourceIndex, targetIndex) {
        let sWord = this.currentSourceSentence[sourceIndex];
        let tWord = this.currentSourceSentence[targetIndex];

        // removing the word from 'targetWords'
        let index = this.AlignementJSON["alignments"][sWord]["targetWords"].indexOf(tWord);
        if (index !== -1) {
            this.AlignementJSON["alignments"][sWord]["targetWords"].splice(index, 1);

            // if the array of the current alignement is empty, we completely
            // remove the entry "sWord"
            if(isNull(this.AlignementJSON["alignments"][sWord]["targetWords"][0])) {
                delete this.AlignementJSON["alignments"][sWord];
                return;
            }

            this.AlignementJSON["alignments"][sWord]["targetIndexes"].splice(index, 1);
        }
    }

    generateReference() {
        let cc = this.currentChapter.toString();
        let cv = this.currentVerse.toString();
        if(this.currentChapter > 0 && this.currentChapter < 10) {
            cc = "00"+cc;
        } else if (this.currentChapter > 10 && this.currentChapter < 100) {
            cc = "0"+cc;
        }

        if(this.currentVerse > 0 && this.currentVerse < 10) {
            cv = "00"+cv;
        } else if (this.currentVerse > 10 && this.currentVerse < 100) {
            cv = "0"+cv;
        }

        return cc+cv;
    }

    /**
     * 
     * @param {string} reference string in format chapterVerse. Ex : '001001' (chapter 1, verse 1)
     * @param {string} sourceWord the source word of the alignment
     * @param {string} targetWord the target word of the alignment
     * @param {int} sourceIndex 
     * @param {int} targetIndex 
     */
    generateTemplateJson() {
        this.AlignementJSON = {
            "sourceText": this.currentSourceSentenceStr,
            "targetText": this.currentTargetSentenceStr,
            "alignments": {}
        }
    }

    /**
     * 
     * @param {string} sourceWord 
     * @param {string} targetWord 
     * @param {int} sourceIndex 
     * @param {int} targetIndex 
     * @returns 
     */
    generateTemplateAlign(sourceWord, targetWord, sourceIndex, targetIndex) {
        return {
            "sourceWord": sourceWord,
            "targetWords": [targetWord],
            "sourceIndex": sourceIndex,
            "targetIndexes": [targetIndex]
        }
    }
}
