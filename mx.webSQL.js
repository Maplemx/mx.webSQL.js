/*webSQL Easy Tool v 1.0 ||| Developed By Moxin ||| Email:maplemx@gmail.com*/
if(typeof($mx) == 'undefined'){var $mx = {};}
if(!$mx.hasOwnProperty('webSQL')){$mx.webSQL = {};}
(function($){
    //default database parameters
    $.defaultParams = {
        shortName : 'defaultDB',
        version : '1.0',
        displayName : 'webSQL default Database',
        maxSize : 10240 //bytes
    };

    //open new database
    $.openDb = function(shortName,version,displayName,maxSize,callback){
        if (!window.openDatabase){
            alert('Sorry, your browser can not support webSQL!');
        }else{
            if(typeof(shortName) == 'undefined'){shortName = $.defaultParams.shortName;}
            if(typeof(version) == 'undefined'){version = $.defaultParams.version;}
            if(typeof(displayName) == 'undefined'){displayName = $.defaultParams.displayName;}
            if(typeof(maxSize) == 'undefined'){maxSize = $.defaultParams.maxSize;}
            $.database = openDatabase(shortName, version, displayName, maxSize);
            if(!$.database){
                console.log('Failed when try to connect the database!');
            }else{
                if(typeof(callback) == 'function'){callback();}
            }
        }
    }

    //close database(delete property 'Database')
    $.closeDb = function(){
        $.database = undefined;
        delete $.database;
    }

    //database open check function
    $.ifOpen = function(){
        if($.hasOwnProperty('database')){return true;}else{return false;}
    }

    //execute SQL only
    $.runSQL = function(SQL,callback){
        if(!$.ifOpen()){$.openDb();}
        $.database.transaction(function(transaction,result){
            transaction.executeSql(SQL,[],callback,function(){
                console.log('SQL Error:' + SQL);
            });
        });
    }

    //execute SQL with a return object
    $.getData = function(SQL,callback){
        $.runSQL(SQL,function(transaction,result){
            var res = new Array();
            for(var i = 0; i < result.rows.length; i++){
                res[i] = result.rows.item(i);
            }
            if(typeof(callback) == 'function'){callback(res);}
        });
    }
})($mx.webSQL)