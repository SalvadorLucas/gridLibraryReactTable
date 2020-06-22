import { ApolloClient } from 'apollo-client';
import { gql } from "apollo-boost"
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const authLink = setContext(({ headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "Bearer eyJ4NXQiOiJaalJtWVRNd05USmpPV1U1TW1Jek1qZ3pOREkzWTJJeU1tSXlZMkV6TWpkaFpqVmlNamMwWmciLCJraWQiOiJaalJtWVRNd05USmpPV1U1TW1Jek1qZ3pOREkzWTJJeU1tSXlZMkV6TWpkaFpqVmlNamMwWmdfUlMyNTYiLCJhbGciOiJSUzI1NiJ9.eyJodHRwOlwvXC93c28yLm9yZ1wvY2xhaW1zXC91c2VybmFtZSI6InhLNW04dUxjbWtsR3Nqb3J1aWRzelhzNnpMaHFEX1YyTTF1SUtyNl9Vd3MiLCJzdWIiOiJ4SzVtOHVMY21rbEdzam9ydWlkc3pYczZ6TGhxRF9WMk0xdUlLcjZfVXdzIiwiaHR0cDpcL1wvd3NvMi5vcmdcL2NsYWltc1wvcm9sZSI6WyIyMzdjMGM3YS1lYmU0LTRlYjYtYWM1OC1kNTc2ZmQ2MmM3YTkiLCIwYmRhNTczYi1lMTc4LTQ4MjQtOTVkMi03NDcwYjFiMzRlYjQiLCI5NGQ0MWZlMi00ZTcwLTQ3OTAtYTIzOC01YzVjMTRiMjc4MWMiLCI3ZDFhODczOS1jOWE5LTQ2MDYtODg3Ny1kYzkyZWYwNmVhNjgiLCJlMzBkOWUxMS1kNWJiLTQ1YjMtYTExOC02Mjg2ZDQ4N2RmYmYiLCIwNjY2MzYxYi1iMjk4LTRjMjMtYjBhMi00MGIyZDE1YWYyMjciLCJjNTMyNTNiZS0xYjY4LTQ0MjEtYmMxYi1jM2M5YWNlYTdhN2MiLCIxMDgwNjE1My0zZWNhLTRjODgtYjU2Yi04YzdmYzMwZDZmMGMiLCJiMDE3ZDExYi1lNDI5LTRiOTMtOWY3NC1jZWQ1MTcwMGE5NWQiLCJiY2RmOWNjMC04MDA1LTQ3NmYtYmIwNS03MWM5NmYwMzgxYTYiLCI0ZjZiODcwZS0xYjY2LTQ0YzgtYWMxYy1mMGUzNWYyNGQyODAiXSwiaXNzIjoiaHR0cHM6XC9cL2Vicy5jaW1teXQub3JnOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJhdWQiOiJUN0JWdnFVb0hUZjR2aEJVSjlkVk45emZLR1lhIiwibmJmIjoxNTkxODU1MzY0LCJodHRwOlwvXC93c28yLm9yZ1wvY2xhaW1zXC9mdWxsbmFtZSI6WyJCUklPTkVTIFBFUkVZUkEiLCIgRXJuZXN0byBKb3NlIChDSU1NWVQpIl0sImh0dHA6XC9cL3dzbzIub3JnXC9jbGFpbXNcL2Rpc3BsYXlOYW1lIjoiRS5CUklPTkVTQENJTU1ZVC5PUkciLCJhenAiOiJUN0JWdnFVb0hUZjR2aEJVSjlkVk45emZLR1lhIiwic2NvcGUiOiJvcGVuaWQiLCJodHRwOlwvXC93c28yLm9yZ1wvY2xhaW1zXC9lbWFpbGFkZHJlc3MiOiJFLkJSSU9ORVNAY2ltbXl0Lm9ubWljcm9zb2Z0LmNvbSIsImV4cCI6MTU5MTg1ODk2NCwiaWF0IjoxNTkxODU1MzY0LCJqdGkiOiI0NDBlMzc2OC05NTlhLTRiODgtOWYyYS04Y2NhNjMxNWVhYmUifQ.gy7fE1Wf8GFQix9KnmCFI-3IIIYn1Wiq6GeIAca7gZnn5SCH3OeNpRYdVIih3Xs0t0EJkW4YuD5LTIICMNywpVKh93FfoYVIhbw1ghDcnBmcv__VwKlIuX7CTOLjzpID3PqYfIzkEeaxdaVx5zFutcWcKzzBGpUR8FypTYvCMnpWa9RZKhUvGvhAG_KC4HsnHVDkaE1HVmuR1_fOsCJg8E2JUxVFKnBe8uF40m_wyT_MeKRQvCF-2OKqVmsbF9Qi9hH-Juf7_X2WiKfbcAj-5p85KDxocUEGK04coVU2kIb0-886G5My-4IiqqpjxDGgprg4GescWkXxYaBTootCbQ",
        },
    }
});

const getForeign = (foreignKey, url) => {
    return new Promise((resolve, reject) => {
        const httpLink = createHttpLink({
            uri: url,
        });
        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
            credentials: 'include'
        });
        const query = gql`
        query{
            find${foreignKey.entity}List(page:{number:1 size:100}){
                content{
                    ${foreignKey.value}
                    ${foreignKey.label}
                }
            }
        }
        `;
        client.query({
            query
        }).then(response=>{
            resolve(response.data[`find${foreignKey.entity}List`].content)
        }).catch(error=>{
            reject(error)
        })
    })
}

export default getForeign