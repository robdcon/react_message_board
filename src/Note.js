import React from 'react'
import './Board.css'
import Draggable from 'react-draggable'
var createReactClass = require('create-react-class')

var Note = createReactClass({

    // Initialise state of Note class setting editing to false

    getInitialState() {
        return {editing: false}
    },

   

    // Method to fire before component is rendered

    componentWillMount()
    {      
      
        this.style = { // Set random position of each note
        
            right:this.randomPosition(0, window.innerWidth - 150, 'px'),
            top:this.randomPosition(0, window.innerHeight - 150, 'px')
        }

    },

    // Method to fire after component is rendered

    componentDidMount()
    {
        

        
    },

    // Method to fire after component has updated

    componentDidUpdate()
    {
        if(this.state.editing)
        {
            this.refs.newText.focus()
            this.refs.newText.select()
        }
    },

    // Prevent unnecessary re-rendering if no change has been made

    shouldComponentUpdate()
    {
        return this.props.children !== this.nextProps || this.state !== this.nextState
    }, 

    // Set random position of each rendered Note

    randomPosition(x, y, s)
    {
        return (x + Math.ceil(Math.random() * (y-x))) + s

    },

    // Change state of Note by setting editing to true

    edit() 
    {
        this.setState({editing: true})
    },

    // Fire onChange event taking the value of newText and the id as arguments

    save() 
    {
        
        this.props.onChange(this.refs.newText.value, this.props.id)
        this.setState({editing:false})
    },

    // Fire onRemove with id of the Note as an argument

    remove() 
    {
        this.props.onRemove(this.props.id)
    },

    // Return a text area input field to add new text to

    renderForm() {
        return (
            <div className="note" style={this.style}>
              <textarea ref="newText"
                        defaultValue={this.props.children}></textarea>
              <button onClick={this.save}>SAVE</button>
            </div>
        )
    },

    // Return 
    renderDisplay() 
    {
        return ( 
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                  <button onClick={this.edit}>EDIT</button>
                  <button onClick={this.remove}>X</button>
                </span>
            </div>
            )
    },

    render() 
    {
      return (

      <Draggable>
      {
        (this.state.editing) ? this.renderForm()
                             : this.renderDisplay()
      }
      </Draggable>
      
      )
    }
})

export default Note