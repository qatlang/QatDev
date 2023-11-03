import { type ILanguageExample } from "./interfaces";

export const examples: ILanguageExample[] = [
	{
		title: 'Hello world', content:
			`pub main() [
   say "Hello, World!".
]`
	},
	{
		title: 'Receive CLI arguments',
		content:
			`pub main -> i32
(args :: multiptr:[cStr]) [
   loop (args'length) : new I [
      say "Argument at ", I, " is: ", args[I].
   ]
   give 0.
]
 `
	},
	{
		title: 'String Datatype',
		content:
			`type String {
   buffer :: multiptr:[var u8 'heap].
   len    :: usize.
   cap    :: usize.
  
   pub default [
      ''buffer = null.
      ''len = 0.
      ''cap = 0.
   ]
 
   pub from (str val) [
      ''buffer = heap'get:[u8](val'length).
      ''len = val'length.
      ''cap = val'length.
      loop (val'length) : new I [
         ''buffer[I] = val[I].
      ]
   ]
 
   pub copy other [
      ''buffer = heap'get:[u8](other'len).
      ''len = other'len.
      ''cap = other'cap.
      loop (other'len) : new I [
         ''buffer[I] = other'buffer[I].
      ]
   ]
 
   pub move other [
      ''buffer = other'buffer.
      ''len = other'len.
      ''cap = other'cap.
      other'buffer = null.
      other'len = 0.
      other'cap = 0.
   ]
 
   pub display() [
      say'only str{''buffer, ''len}.
   ]
 
   pub end [
      heap'put(''buffer).
      ''len = 0.
      ''cap = 0.
   ]
}
 
`
	},
];