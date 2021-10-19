export const Alpha_Chars = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '.com',
]
export const LowerCase_Chars = Alpha_Chars.map(char => char.toLowerCase())
export const Special_Chars = [
  '@',
  '$',
  '_',
  '(',
  ')',
  ':',
  ';',
  "'",
  '"',
  '-',
  '!',
  '#',
  '=',
  '/',
  '+',
  '?',
  '.',
  ',',
]
export const Numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export const ExecKeys = ['Del', 'Enter', 'Space']

// merge arrays of keys
export const mergeKeyTypes = (array1, array2) => {
  return array1.concat(array2)
}

// key characters specific shift keys
export const ShiftToSpecials = '!#$'
export const ShiftFromSpecials = 'abc'
export const ShiftToUpperCase = 'Shift^'
export const ShiftFromUpperCase = 'Shift-'

export const EmailShortCuts = ['@hotmail.com', '@outlook.com', '@gmail.com']
