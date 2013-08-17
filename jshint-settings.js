// jshint: options for linting JavaScript. See http://www.jshint.com/options/ for more info.
// By deault, eval is allowed.
"jshint_options": {
  // This option prohibits the use of bitwise operators such as ^ (XOR), | (OR) and others
  "bitwise": false
  // This option allows you to force all variable names to use either camelCase style or UPPER_CASE with underscores.
  , "camelcase": false
  // This option requires you to always put curly braces around blocks in loops and conditionals.
  , "curly": false
  // This options prohibits the use of == and != in favor of === and !==.
  // Note: Even if this option is off, JSHint will check for unsafe comparisons like != null unless option eqnull (see below) is turned on.
  , "eqeqeq": false
  // This option requires all for in loops to filter object's items (hasOwnProperty)
  , "forin": false
  // This option prohibits the use of immediate function invocations without wrapping them in parentheses.
  // Wrapping parentheses assists readers of your code in understanding that the expression is the result of a function, and not the function itself.
  , "immed": true
  // This option enforces specific tab width for your code.
  , "indent": 4
  // This option prohibits the use of a variable before it was defined.
  , "latedef": true
  // This option requires you to capitalize names of constructor functions.
  , "newcap": true
  // This option prohibits the use of arguments.caller and arguments.callee.ES5 forbids the use of arguments.callee in strict mode.
  , "noarg": true
  // This option warns when you have an empty block in your code.
  , "noempty": true
  // This option prohibits the use of constructor functions for side-effects.
  , "nonew": true
  // This option prohibits the use of unary increment and decrement operators.
  , "plusplus": false
  // THis option enforces the consistency of quotation marks used throughout your code.
  // true: don't enforce one particular style but want some consistency
  // "single": allow only single quotes
  // "double": allow only double quotes.
  , "quotmark": "double"
  // This option prohibits the use of unsafe . in regular expressions.
  , "regexp": true
  // This option prohibits the use of explicitly undeclared variables.
  // If your variable is defined in another file, you can use /-*global ... *-/ syntax
  // to tell JSHint about it. See the About page for more information.
  , "undef": true
  // This option warns when you define and never use your variables.
  // will also warn you about unused global variables declared via /-*global ... *-/.
  , "unused": true
  // ES5 strict mode for function scope
  // If you (really) want to use global strict mode, see the globalstrict option.
  , "strict": false
  // This option makes it an error to leave a trailing whitespace in your code.
  , "trailing": true
  // max number of formal parameters allowed per function
  //, "maxparams": 3 // BUGGY, get "cannot read property ength of undefined" when linting
  // control how nested do you want your blocks to be
  , "maxdepth": 3
  // max number of statements allowed per function
  , "maxstatements": 14
  // This option lets you control cyclomatic complexity throughout your code.
  // Cyclomatic complexity measures the number of linearly independent paths through a program's source code.
  // Read more about cyclomatic complexity on Wikipedia.
  , "maxcomplexity": 7


  //
  // Relaxing Options
  //  - SUPRESS certain warnings
  //

  // missing semicolons
  , "asi": false
  // use of assignments in cases where comparisons are expected
  , "boss": false
  // use of debugger statements
  , "debug": false
  // x == null comparisons
  , "eqnull": true
  // This option tells JSHint that your code uses ES5 specific features such as getters and setters
  , "es5": false
  // This option tells JSHint that your code uses ES.next specific features such as const
  , "esnext": false
  // warnings about the use of eval
  , "evil": true
  // use of expressions where normally you would expect to see assignments or function calls
  , "expr": true
  // declaring variables inside of control structures while accessing them later from the outside
  , "funcscope": false
  // use of global strict mode
  , "globalstrict": false
  // use of the __iterator__ property
  , "iterator": false
  // missing semicolons, but only when the semicolon is omitted for the last statement in a one-line block
  , "lastsemic": false
  // possibly unsafe line breakings in your code. It doesn't suppress warnings about comma-first coding style
  , "laxbreak": true
  // comma-first coding style
  , "laxcomma": true
  // defining functions inside of loops
  , "loopfunc": false
  // multi-line strings
  , "multistr": false
  // switches with just one case
  , "onecase": false
  // use of the __proto__ property
  , "proto": false
  // unescaped - in the end of regular expressions
  , "regexdash": false
  // use of script-targeted URLs—such as javascript:apa();
  , "scripturl": false
  // used mixed tabs and spaces when the latter are used for alignmnent only
  , "smarttabs": false
  // variable shadowing
  , "shadow": false
  // using [] notation when it can be expressed in dot notation
  , "sub": true
  // use of "weird" constructions like new function () { ... } and new Object;
  , "supernew": true

  // possible strict violations when the code is running in strict mode and you use this in a non-constructor function.
  // You should use this option—in a function scope only—when you are positive that your use of this is valid in the strict mode (for example, if you call your function using Function.call).
  // Note: This option can be used only inside of a function scope. JSHint will fail with an error if you will try to set this option globally.
  , "validthis": false


  //
  // Environments
  //    - These options pre-define global variables that are exposed by
  //       popular JavaScript libraries and runtime environments—such as
  //       browser or node.js.
  //
  //       Essentially they are shortcuts for explicit declarations like /-*global $:false, jQuery:false *-/

  // globals exposed by modern browsers
  // Note: This option doesn't expose variables like alert or console. See option devel for more information.
  , "browser": true
  // globals exposed by CouchDB
  , "couch": false
  // globals that are usually used for logging poor-man's debugging: console, alert, etc
  , "devel": true
  // globals exposed by the Dojo Toolkit
  , "dojo": false
  // globals exposed by the jQuery JavaScript library
  , "jquery": false
  // globals exposed by the MooTools JavaScript framework
  , "mootools": false
  // globals available when your code is running inside of the Node runtime environment
  , "node": false
  // non-standard but widely adopted globals such as escape and unescape
  , "nonstandard": true
  // globals exposed by the Prototype JavaScript framework
  , "prototypejs": false
  // globals available when your code is running inside of the Rhino runtime environment
  , "rhino": false
  // globals available when your code is running inside of a Web Worker
  , "worker": false
  // globals available when your code is running as a script for the Windows Script Host
  , "wsh": false


  // Legacy
  // - These options are legacy from JSLint.
  //     Aside from bug fixes they will not be improved in any way and might be removed at any point.
  //

  // disallows the use of dangling _ in variables
  , "nomen": false
  // allows only one var statement per function
  , "onevar": false
  // makes JSHint stop on the first error or warning
  , "passfail": false
  // check your source code against Douglas Crockford's JavaScript coding style
  , "white": false

}
