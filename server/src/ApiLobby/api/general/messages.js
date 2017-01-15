var merge = require('merge');

module.exports.generalMessage = generalMessage;
module.exports.errorMessage=errorMessage;

function generalMessage(replayJsonMessage,code,description){
    
    var msg={
        code:code,
        description:description,
        
      
    }
    

    return merge(msg,replayJsonMessage);
}



function errorMessage(errorObj,obj){
    var msg={
        code:errorObj.code,
        description:errorObj.reason,
        
      
    }
 return merge(msg,obj);}