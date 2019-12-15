import React from 'react'
import './Board.css'
import Draggable from 'react-draggable'
import  postItNoteLow from "./img/post-it-note-low.png"
import  postItNoteMed from "./img/post-it-note-med.png"
import  postItNoteHigh from "./img/post-it-note-high.png"

const priorityLevels = 
[
    {
        level:'Low',
        img:postItNoteLow
    },
    {
        level:'Med',
        img:postItNoteMed
    },
    {
        level:'High',
        img:postItNoteHigh
    },
]

var createReactClass = require('create-react-class')

var Note = createReactClass({

    // Initialise state of Note class setting editing to false

    getInitialState() {
        return {
            editing: false,
            priorityLevel:this.props.priorityLevel
        }
    },
    background()
    {
       const level = this.state.priorityLevel
       return priorityLevels[level].img
    },

    // Method to fire before component is rendered

    componentWillMount()
    {      
      
        this.style = { // Set random position of each note

            //backgroundImage:"url('./img/post-it-note.png')",
            backgroundImage : `url(${this.background()})`,
        
            right:this.randomPosition(0, window.innerWidth - 150, 'px'),
            top:this.randomPosition(0, window.innerHeight - 150, 'px')
        }

    },
    componentDidMount()
    {
       
    },

    // increasePriority()
    // {
    //     console.log('plus')
    //     this.setState((prevState) => {
    //     return{ priorityLevel: (prevState.priorityLevel + 1 > 2) ? 0 : prevState.priorityLevel + 1}
    //   })
       
    // },

    // decreasePriority()
    // {
    //     console.log('minus')
    //     this.setState((prevState) => {
    //     return{ priorityLevel:  (prevState.priorityLevel - 1 < 0) ? 3 : prevState.priorityLevel - 1}
    //   })
       
    // },

    // Method to fire after component has updated

    componentDidUpdate(prevProps, prevState)
    {
        if(this.state.editing)
        {
            this.refs.newText.focus()
            this.refs.newText.select()
        }
        this.style.backgroundImage = `url(${this.background()})`
        
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

    increasePriority(id)
    {
        this.setState((prevState) => 
        {
             return {priorityLevel:(prevState.priorityLevel + 1 > 2) ? 0 : prevState.priorityLevel + 1}
        }, () =>
        {
            this.props.onPriorityChange(this.state.priorityLevel, this.props.id)
        });
       
       
    },
    decreasePriority(id)
    {
       
        this.setState((prevState) => 
        {
             return {priorityLevel:(prevState.priorityLevel - 1 < 0) ? 2 : prevState.priorityLevel - 1}
        }, () =>
        {
            this.props.onPriorityChange(this.state.priorityLevel, this.props.id)
        });
       
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
                <div>
                     <button onClick={this.increasePriority}>+</button>
                    <button onClick={this.decreasePriority}>-</button>
                </div>
            </div>
            )
    },

    render() 
    {
      return (

      <Draggable enableUserSelectHack={false}>
      {
        (this.state.editing) ? this.renderForm()
                             : this.renderDisplay()
      }
      </Draggable>
      
      )
    }
})

export default Note