const {format_date, format_plural, format_url} = require('../utils/helpers');

test('format_url() returns a simplified url string', () => {
  const url1 = format_url('http://test.com/page/1');
  const url2 = format_url('https://www.vest.com/silkvest/');
  const url3 = format_url('https://www.quest.com?q=hello');

  expect(url1).toBe('test.com');
  expect(url2).toBe('vest.com');
  expect(url3).toBe('quest.com');
});

test('format_plural() returns a pluralized word', () => {
  const word1 = format_plural('lizards', 1);
  const word2 = format_plural('liasons', 2);

  expect(word1).toBe('lizards');
  expect(word2).toBe('liasons');
});

test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(format_date(date)).toBe('3/20/2020');
});