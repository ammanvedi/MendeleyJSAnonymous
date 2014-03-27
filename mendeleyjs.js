var Mendeley = (function () {



    // A private counter variable
    var AccessToken = 0;
    var getSearchResults = function (searchterm, donext) {

        searchbase = 'https://api-oauth2.mendeley.com/oapi/documents/search/' + encodeURIComponent(searchterm) + '/';

        $.ajax({
            url: this.searchbase,
            type: 'get',
            data: {
                access_token: AccessToken,
            },
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function (data) {

                if (data) {
                    donext(data);
                    return;
                } else {
                    donext('err http err');
                    return;
                }

            }
        });

    }

    // A private function which logs any arguments
    var getAccessToken = function (cid, cs, auth_next) {
        tokenbase = 'https://api-oauth2.mendeley.com/oauth/token';

        //auth_next(tokenbase);

        $.ajax({
            url: this.tokenbase,
            type: 'post',
            data: {
                grant_type: 'client_credentials',
                client_id: cid,
                client_secret: cs
            },
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function (data) {

                if (data) {
                    AccessToken = data.access_token;
                    //console.log(this.AccessToken);
                    auth_next(null);
                    return;
                } else {
                    auth_next('err http err');
                    return;
                }

            }
        });
    };

    return {

        // A public variable
        clientid: 0,
        clientsecret: 0,

        // A public function utilizing privates
        auth: function (_id, _secret, next) {

            this.clientid = _id;
            this.clientsecret = _secret;

            // Call our private method using bar
            if ((this.clientid == 0) || (this.clientsecret == 0)) {
                next('err: client id or secret not present');
            } else {
                getAccessToken(this.clientid, this.clientsecret, next);
            }
            return;
        },

        search: function (term, resultHandler) {

            if (AccessToken == 0) {
                throw "Not Authenticated, use .auth method";
                resultHandler(null);
                return;
            } else {

                getSearchResults(term, resultHandler);
                return;
            }

        }
    } //end return 

})();