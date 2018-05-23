import TEST_LYRIC_1 from './testlyric1.js';
import TEST_LYRIC_2 from './testlyric2.js';
import TEST_LYRIC_3 from './testlyric3.js';

TEST_LYRIC_1.id = 1;
TEST_LYRIC_2.id = 2;
TEST_LYRIC_3.id = 3;

const testResult = [
    TEST_LYRIC_1,
    TEST_LYRIC_2,
    TEST_LYRIC_3
  ];

class Database {
  search(term, callback) {
    console.log(`Searching for: ${term}`);
    callback(testResult);
  }

  get(id, callback) {
    console.log(`Getting: ${id}`);
    // Temporary test method
    for (let i=0; i<testResult.length; i++) {
      if (id === testResult[i].id) {
        // console.log(`Found: ${testResult[i].title}`);
        callback(testResult[i]);

      }
    }
    // callback(null);
  }
}

export default Database;
