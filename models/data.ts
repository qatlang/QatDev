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

export const languageFeatures = [
	{
		title: 'Customisable RAII',
		content: `
_**R**esource **A**cquisition **I**s **I**nitialisation_ is a principle in which acquiring/creating a resource initialises it and it is automatically destroyed when the scope/lifetime of the resource ends. In \`qat\`, this is achieved via Constructors and Destructors.
However if any type you create is trivially movable, that is if the instance can be moved by moving the bits, then that type will not have destructors by default.

\`\`\`qat
type Employee {
	pub id :: i64.
	pub section :: i32.
}
\`\`\`

`},
	{
		title: 'Mix types (Sum types)',
		content: `
What if you want a number type that could either be an integer or a float? You use \`mix\` type in qat.This is how runtime polymorphism is achieved in \`qat\`. You can mix many types into a single type.
\`\`\`qat
mix Number {
	Int :: i64,
	Float :: f64,
}
\`\`\`
`,
	},
	{
		title: 'Smarter Pointers',
		content: `
Pointers in qat introduces the concept of ownership. This allows you to keep track of the origin of the pointer at compile time (zero cost), and also introduces some safe pointer types in the language. If you are a fan of manual memory management, there is also heap ownership for that. There also are anonymous pointers where you don't worry about the owner of the pointer.
\`\`\`qat
ptr:[i32] // Anonymous
ptr:[i32, heap] // Manual memory management
ptr:[i32, region(Region)] // Always Safe
ptr:[i32, static] // Always Safe
\`\`\`
`
	},
	{
		title: 'No Garbage Collection. No pauses.',
		content: 'RAII, Pointer ownership, Copy & Move semantics, Trivial copy & move and other key features of the language makes it unnecessary for the language to have garbage collection. This means that your programs are never throttled by the language runtime. No freezes. No GC pauses.'
	},
	{
		title: 'Pattern Matching',
		content: `
\`qat\` makes it easy for you to work with mix types by enabling you to do pattern matching over it. So essentially you can \`mix\` and \`match\` data. This also makes it easy to do string comparisons and have optimisations to remove unused branches of code when the conditions are known at compile time.
\`\`\`qat
new value = Number::Int(0).
mix (value) [
	::Int(i) => [
		say "Number is Int".
	]
	::Float(f) => [
		say "Number is Float".
	]
]
\`\`\`
`
	},
	{
		title: 'Prerun Expressions',
		content: 'What if you can use the compiler to execute logic at compile time rather than during runtime? `qat` takes compile time meta-programming to the next level and enables you to use any type that can be constructed from prerun types to be used in prerun expressions'
	},
	{
		title: 'Generic Types (on steroids)',
		content: 'Normal types (structs) and type definitions in `qat` can be generic types. You can input types and even **prerun expressions** to instantiate different variants of the generic type. In `qat` packing of data was actively considered during design to support memory constrained environments, so you can tightly pack the generic variant types'
	},
	{
		title: 'Mutable Value Semantics',
		content: `
Value Semantics allows the programmer to use/manage data whose lifetime is not bound to an address. This is also used in conjunction with copy & move semantics. If your type is trivially movable, you can access member fields of the value directly from (virtual) registers. Exploiting this behaviour, users can achieve extreme performance
\`\`\`qat
customStr -> str
() [
	give "This is a custom string".
]

pub main -> i32
() [
	new strLen = customStr()'length.
	give 0.
]
\`\`\`
You can do the above in other languages as well, but in the above case, since \`str\` type is trivially movable, the length is extracted directly from the value without allocating it. 
`
	},
	{
		title: 'Copy & Move semantics',
		content: `
Copy Constructor, Move Constructor, Copy Assignment & Move Assignment. This makes it easy to manage duplication/ownership of data. Both copy & move occurs via references, and in general, is done before an instance is passed to a different context.
\`\`\`qat
new strVal = std:String from ("").
new var otherVal = strVal'copy.
new anotherVal = otherVal'move.
\`\`\`
`
	},
	{
		title: 'References',
		content: `One major advantage of references in \`C++\` is the convenience you get with it, especially when you use operators. References also makes it possible to easily use data without making copies/moves. You get all that convenience in \`qat\`. References are meant to be used when the programmer is sure that the instance referred to outlives the current context of execution. They are usually expected to not be stored anywhere`
	},
];