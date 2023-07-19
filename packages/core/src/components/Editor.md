# Editor demo 1

The demo demonstrates using two Editor instances (side by side) including synchronised navigation.

```js
import { useState, useEffect, useMemo } from 'react';

import EpiteleteHtml from 'epitelete-html';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { usfmText } from '../data/tit.en.ult.usfm.js';
import { usfmTextFra } from '../data/86-TITfraLSG.usfm.js';
import { usfm2perf } from '../helpers/usfm2perf';

function MyEditor({
  bookId,
  reference,
  onReferenceSelected,
  docSetId,
  usfmText,
  ...props
}) {
  const verbose = true;
  const [ready, setReady] = useState(false);
  const epiteleteHtml = useMemo(
    () =>
      new EpiteleteHtml({
        proskomma: undefined,
        docSetId,
        options: { historySize: 100 },
      }),
    []
  );

  const onSave = (bookCode, usfmText) => {
    console.log(`save button clicked: ${docSetId} ${bookCode}`, usfmText);
  };

  useEffect(() => {
    async function loadUsfm() {
      const tempPerf = usfm2perf(usfmText);
      await epiteleteHtml.sideloadPerf(bookId, tempPerf);
      setReady(true);
    }
    if (epiteleteHtml) loadUsfm();
  }, [epiteleteHtml]);

  const editorProps = {
    epiteleteHtml,
    bookId,
    reference,
    onReferenceSelected,
    onSave,
    verbose,
    ...props
  };

  return <>{ready ? <Editor {...editorProps} /> : 'Loading...'}</>;
}

function DoubleContainer() {
  const bookId = 'TIT';
  const [reference, setReference] = useState({ bookId, chapter: 1, verse: 1 });

  const onReferenceSelected = ({ sourceId, bookId, chapter, verse }) => {
    setReference({ sourceId, bookId, chapter, verse });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        <Grid item key="Test" xs={12} sm={6}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent
              sx={{
                flexGrow: 1,
                height: '40vh',
                overflow: 'hidden',
                overflowY: 'auto',
              }}
            >
              <MyEditor
                docSetId={'Xxx/en_tit'}
                bookId={bookId}
                reference={reference}
                onReferenceSelected={onReferenceSelected}
                usfmText={usfmText}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item key="Test2" xs={12} sm={6}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent
              sx={{
                flexGrow: 1,
                height: '40vh',
                overflow: 'hidden',
                overflowY: 'auto',
              }}
            >
              <MyEditor
                docSetId={'LSG/fra_tit'}
                bookId={bookId}
                reference={reference}
                onReferenceSelected={onReferenceSelected}
                usfmText={usfmTextFra}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

<DoubleContainer/>

```