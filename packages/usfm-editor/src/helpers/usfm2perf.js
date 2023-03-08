import { Proskomma } from 'proskomma-core'

export const usfm2perf = (usfm) => {
    let perf;
    try {
        // [
        //     {
        //         name: "lang",
        //         type: "string",
        //         regex: "^[^\\s]+$"
        //     },
        //     {
        //         name: "abbr",
        //         type: "string",
        //         regex: "^[^\\s]+$"
        //     },
        //     {
        //         name: "bookCode",
        //         type: "string",
        //         regex: "^[^\\s]+$"
        //     },
        // ]
        const pk = new Proskomma();
        console.log(pk)
        pk.importDocuments(
            {lang: 'xxx', abbr: 'XXX'}, // doesn't matter...
            ['usfm'], 
            usfm
        )
        // pk.importDocuments(
        //     {lang: 'xxx', abbr: 'XXX'}, // doesn't matter...
        //     'usfm', 
        //     [usfm]
        // );
        console.log(pk)

        // const perfResult = pk.gqlQuerySync('{documents {id docSetId perf} }')
        // console.log(JSON.stringify(perfResult))
        // const perfResultDocument = perfResult?.data?.documents[0];
        // console.log(perfResultDocument)
        // perf = JSON.parse(perfResultDocument.perf);

    } catch (e) {
        console.log(e)
        perf = null
    }
    return perf;
}