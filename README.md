Javascript + Mendeley Public API
============

A wrapper for the mendeley api's public methods, compliant with the new oauth 2.0 implementation.

###Supported Methods
<pre>auth("clientid", "client secret", resultHandler)
search("searchterm", resultHandler)</pre>

###Usage
include the js 
```html
<script src="mendeleyjs.js"></script>
```
create an instance of the library
```javascript
	//instantiate a mendeley object
    var m = Mendeley;
    
    //run the auth with your client id and client secret
    m.auth('clientid', 'client secret', function (err) {

        if (err) {
        	//returns null if authentication was successful
            console.log('err');
        } else {
            console.log("success");
            //you can now call the search method, which will return
            //an array of documents
            m.search("Data", function (result) {
            	//returns a JSON  object with document data  array inside
                console.log(result);
            });
        }
    });
```

###About

[Mendeley](http://www.mendeley.com/) is a site that provides tools to manage references and citations to academic research papers. They also provide a search facility for their paper collection. This wrapper is being developed to link Mendeley into the search feature of [Seeder](https://github.com/ammanvedi/seeder)

I will be adding more methods to the api soon.
