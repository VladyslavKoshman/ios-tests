import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const RESULTS_DIR = 'allure-results';

function ensureDir() {
  if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
  }
}

function uuid() {
  return crypto.randomUUID();
}

export function allureTest(name, fn) {
  ensureDir();
  const id = uuid();
  const start = Date.now();

  return Promise.resolve()
    .then(fn)
    .then(() => writeResult('passed'))
    .catch((err) => {
      writeAttachment(id, 'error.txt', err.stack || String(err));
      writeResult('failed', err);
      throw err;
    });

  function writeResult(status, err) {
    const result = {
      uuid: id,
      name,
      status,
      stage: 'finished',
      start,
      stop: Date.now(),
      statusDetails: err
        ? { message: err.message, trace: err.stack }
        : undefined,
    };

    fs.writeFileSync(
      path.join(RESULTS_DIR, `${id}-result.json`),
      JSON.stringify(result, null, 2)
    );
  }
}

export function allureAttachment(testId, name, content, type = 'text/plain') {
  ensureDir();
  const file = `${uuid()}-attachment`;
  fs.writeFileSync(path.join(RESULTS_DIR, file), content);

  fs.writeFileSync(
    path.join(RESULTS_DIR, `${testId}-attachment.json`),
    JSON.stringify(
      {
        uuid: uuid(),
        source: file,
        name,
        type,
      },
      null,
      2
    )
  );
}
