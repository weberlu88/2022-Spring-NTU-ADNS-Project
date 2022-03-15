// import { useState } from 'react'

// function App() {
//   const [count, setCount] = useState(0)
//   const [inputText, setInputText] = useState('44444')

//   return (
// <div>
//   <button onClick={() => setCount((count) => count + 1)}>
//     count is: {count}
//   </button>
//   <input value={inputText} onChange={(e) => {setInputText(e.target.value)}} />
// </div>
//   )
// }
// export default App

import React from 'react'

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0,
//       inputText: ''
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ inputText: event.target.value });
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={() => {this.setState({ count: this.state.count+=1 })}}>
//           count is: {this.state.count}
//         </button>
//         {/* value的用意?? */}
//         <input value={this.state.inputText} onChange={this.handleChange} />
//       </div>
//     );
//   }
// }
// export default App

import { useState } from 'react'
function App() {
  const [textInput, setTextInput] = useState({ name: '', message: '' })
  const [comments, setComments] = useState(
    /** @type {{name: string, message: string}[]} */([])
  )

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleTextInputChange = ({ target: { name, value } }) => {
    // 參數為 event.target
    console.log('name ', name, ', value ', value)
    // name變數必為textInput中的key (key為string型別)
    // 更新textInput的name屬性
    // 動態更新Key的技巧稱為 Computed property names
    setTextInput(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleFormSubmit = (event) => {
    setComments(prev => [...prev, textInput]) // 把textInput接在comments陣列 (push)
    // comments.push(textInput)               // 同意於上句
    setTextInput({ name: '', message: '' })   // 清空input
    event.preventDefault();                   // 防止換頁
  }


  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input name="name" value={textInput.name} onChange={handleTextInputChange} />
        <input name="message" value={textInput.message} onChange={handleTextInputChange} />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {comments.map((comment, index) =>
          <div key={index}>{comment.name}: {comment.message}</div>
        )}
      </div>
    </div>
  );
}
export default App;



