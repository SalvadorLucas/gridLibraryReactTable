export default function get(url, callback){
    var headers = new Headers()//HEADERS FOR FETCH
        headers.append('Accept','application/json')//ADD HEADERS TO MAKE REQUEST
        var init = { method: 'GET',
                  headers: headers
                    };
        fetch(url, init)
        .then(function(response) {
            if(response.ok){
                return response.json()//MAKE RESPONSE TO JSON DATA
            }
        })
        .then(function(json){
            callback (json)//RETURN JSON DATA
        })
        .catch(function(error){
            console.log(error)//SHOW ERROR DETAILS IN CONSOLE
        })
}