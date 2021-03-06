import React from 'react'
import './Board.css'
import Note from "./Note"
import  noticeBoardXl from "./img/notice-board-xl.png"


var createReactClass = require('create-react-class')

 // Board class for displaying notes

var Board = createReactClass({

    // propTypes to control number of notes displayed on board

    propTypes:
    {

        count: function(props, propName) 
        {

            if(typeof props[propName] !== "number") 
            {
                return new Error("the count must be a number")
            } 

            if(props[propName] > 100) 
            {
                return new Error('Creating ' + props[propName] + ' notes is ridiculous')
            }
        }
    },

    // Set the initial state of the Board class

    getInitialState() 
    {
        return {

            notes: [],
            count:0
            
        }
    }, 

    //Method for handling unique ID for each note

    nextId()
    {
            this.state.uniqueId = this.state.uniqueId || 0
            return this.state.uniqueId++
    },

    // Add a note to the Board

    add(text)
    {
        //text = "New Note"
        var notes = [
            ...this.state.notes,
            {
                id:this.nextId(),
                note:text,
                priorityLevel:1

            }
        ]
        this.setState({notes})
    },

    checkLocalStorage()
    {
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('feature_test', 'yes');
                if (localStorage.getItem('feature_test') === 'yes') {
                    localStorage.removeItem('feature_test');
                    // localStorage is enabled
                    console.log('Local Enabled')
                    return true
                } else {
                    // localStorage is disabled
                    console.log('Local Disabled')
                    return false
                }
            } catch(e) {
                // localStorage is disabled
                console.log('Local Disabled', e)
                return false
            }
        } else {
            // localStorage is not available
            console.log('Local Not Available')
            return false
        }
    },

    saveNotesToLocal()
    {
        const board = 
        {
            uniqueId: this.state.uniqueId || 0,
            notes: this.state.notes
        }
        const jsonNotes = JSON.stringify(board)
        localStorage.setItem('message_board_notes', jsonNotes);
        console.log('saved')
    },


    // Update the array of notes in the Board class's state
    // Map through each note using a callback function
    // If the note ID is not equal to the current note return note
    // Otherwise return note with its original keys except for 'note' key, which is set to new text
    // Set the state of the Board classs to the new notes variable

    update(newText, id)
    {
        var notes = this.state.notes.map(

            note => (note.id !== id) ?
            note : 
                {
                    ...note,
                    note:newText
                }

            )
        this.setState({notes});
       
    },
   

    updatePriority(priorityLevel, id)
    {
        const newLevel = priorityLevel--
        var notes = this.state.notes.map(

            note => (note.id !== id) ?
            note : 
                {
                    ...note,
                    priorityLevel:newLevel
                }

            )
        this.setState({notes});
       
    },

    componentWillMount()
    {

        const board = JSON.parse(localStorage.getItem('message_board_notes'))

        if(!board) return
      
        const notes = board.notes   
        const id = board.uniqueId
       
        if(!notes.length > 0)
        {
            console.log('no notes')
            return
        }
        else
        {
            console.log(notes)
        }
        this.setState({
            notes:notes,
            uniqueId:id
        })
        

        // if(this.props.count)
        // {
        //     var count = this.props.count;
        //     for (var i = 1; i <= count; i++)
        //     {   
        //         this.add('New Note')
        //         console.log(i)
        //     }
        //     // var url = `http://api.icndb.com/jokes/random/${this.props.count}?limitTo=[nerdy]`
        //     // fetch(url)
        //     //     .then(results => results.json())
        //     //     .then(obj => obj.value)
        //     //     .then(array => array.forEach(item => this.add(item.joke)))
        // }
       
    },

    componentDidUpdate(prevState, state)
    {
        if(prevState.notes !== this.state.notes)
        {
            console.log('updated')
            this.saveNotesToLocal()
        }
        else
        {
            console.log('not updated')
            alert('error, not saved to local')
        }
        if(prevState.priorityLevel !== this.state.priorityLevel)
        {
            console.log('update priority')
        }
    },
    

    // Takes the note's id as an argument
    // Filter through the notes state of Board class
    // Return a new array consisting of all notes whise id does not match the id parameter

    remove(id)
    {
            var notes = this.state.notes.filter(note => note.id !== id)
            this.setState({notes})
    },

    clearAllNotes()
    {
        this.setState({
            notes:[]
        })
        localStorage.setItem('message-board-notes', "")
    },

    // Return an instance of Note
    // Set the key and id to note.id
    // Set methods to handle updating and removing notes
    // Set the child to the notes text

    eachNote(note)
    {
            return (

                <Note key={note.id} 
        
                      id={note.id} 
                      priorityLevel={note.priorityLevel}
                      onChange={this.update} 
                      onRemove={this.remove}
                      onPriorityChange={this.updatePriority}
                      >
                        {
                            note.note
                        }

                </Note>

                )
    },

    render() {

        return (

                <div className='board' style={{ backgroundImage:{noticeBoardXl},
                                                                backgroundSize:'initial' }}>
    
                    {(this.state.notes.length > 0) ? this.state.notes.map(this.eachNote) : null}
                    <button onClick={() => this.add('New Message')}>+ Add Note</button>
                    

                </div>

                )
    }
})

export default Board
