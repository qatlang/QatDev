import { type ILanguageExample } from "./interfaces";

export const examples: ILanguageExample[] = [{
   title: 'String Datatype',
   content:
      `type String {
   buffer :: #[+ var u8 'heap].
   len    :: usize.
   cap    :: usize.
  
 pub:
   default [
      ''buffer = null.
      ''len = 0.
      ''cap = 0.
   ]
 
   from (str val) [
      ''buffer = heap'get'<u8>(val'length).
      ''len = val'length.
      ''cap = val'length.
      loop (val'length) : new I [
         ''buffer[I] = val[I].
      ]
   ]
 
   copy other [
      ''buffer = heap'get'<u8>(other'len).
      ''len = other'len.
      ''cap = other'cap.
      loop (other'len) : new I [
         ''buffer[I] = other'buffer[I].
      ]
   ]
 
   move other [
      ''buffer = other'buffer.
      ''len = other'len.
      ''cap = other'cap.
      other'buffer = null.
      other'len = 0.
      other'cap = 0.
   ]
 
   display() [
      say'only str{''buffer, ''len}.
   ]
 
   end [
      heap'put(''buffer).
      ''len = 0.
      ''cap = 0.
   ]
}
 
`
},
{
   title: 'Hello world', content:
      `main() [
   say "Hello, World!".
]`
},
];

export const features: string =
   `I know that the capabilities of a programming language cannot be summarised to a few hundred words. But here is a short list of some key features of the language, for those who want to get a basic idea of what the language can or cannot do.
### RAII
_**R**esource **A**cquisition **I**s **I**nitialisation_ is a principle in which acquiring/creating a resource initialises it and it is automatically cleaned up when the scope/lifetime of the resource ends. In \`qat\`, this is achieved via Constructors and Destructors.

### Copy & Move semantics

Copy Constructor, Move Constructor, Copy Assignment & Move Assignment. This makes it easy to manage duplication/ownership of data. Both copy & move occurs via references, and in general, is done before an instance is passed to a different context.

### Value Semantics

Value Semantics allows the programmer to use/manage data whose lifetime is not bound to an address.
This is also used in conjunction with copy & move semantics.

### References

One major advantage of references in \`C++\` is the convenience you get with it, especially when you use operators. References also makes it possible to easily use data without making copies/moves. You get all that convenience in \`qat\`. References are meant to be used when the programmer is sure that the instance referred to outlives the current context of execution.

### Raw Pointers

It's a systems language, of course you want to use pointers. \`qat\` doesn't restrict that in anyway, however, raw pointers has a fresh syntax, in order to pave way to another major feature
`;