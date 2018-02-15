 // Use fetch method to request API data and display it in the DOM

    componentWillMount()
    {
        var url = "https://api.edamam.com/search?q=chicken&app_id=f86a9d27&app_key=eafbbceae5126fcc52614412a2ae8441&from=0&to=1&calories=gte%20591,%20lte%20722&health=alcohol-free"
        fetch(url)
        .then(response => 
                {

                    return response.json() // Format response into json

                })
        .then(json => 
                {
                    // Store array of recipes in a variable : recipeList
                    var recipeList = json.hits 
                    
                    let pictures = recipeList.map(
                        item =>
                        {
                            // Store array of ingredients in a variable : ingredientList
                            var ingredientList = item.recipe.ingredients
                            // console.log(ingredientList)
                            // Return a div containing required items
                            // Assign unique ID to each item
                            // Get item image
                            // Map through ingredientList array and return an <li> for
                            // each required item of data
                            return (
                                <div key={this.nextId}> 
                                    <p>{item.recipe.label}</p>
                                    <img src={item.recipe.image} alt={item.recipe.label}/>

                                    {/*List of ingredients*/}
                                    <div>
                                        <ul> 
                                            {

                                                ingredientList.map(ingItem => 
                                                    {
                                                        return <li>{ingItem.text}</li>
                                                    }
                                                )
                                            }
                                        </ul>
                                    </div>

                                    {/*List of Allergens*/}
                                    <div>
                                        <ul> 
                                            {
                                                ingredientList.map(ingItem => 
                                                    {
                                                        return <li>{ingItem.text}</li>
                                                    }
                                                )
                                            }
                                        </ul>
                                    </div>

                                </div>
                                )
                        }
                    )

                    this.setState({pictures:pictures})
                    // console.log("state", this.state.pictures)
                })

        

    },