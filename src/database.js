import TEST_LYRIC_1 from './testlyric1.js';
import TEST_LYRIC_2 from './testlyric2.js';
import TEST_LYRIC_3 from './testlyric3.js';

const testResult = {
  results: {
    result1: TEST_LYRIC_1,
    result2: TEST_LYRIC_2,
    result3: TEST_LYRIC_3
  }
};

class Database {
  search(term, callback) {
    console.log(`Searching for: ${term}`);
    // callback(testResult);
    callback(TEST_LYRIC_1);
  }
}

export default Database;
