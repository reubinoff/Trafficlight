

module.exports.generalMessage = generalMessage;
module.exports.errorMessage=errorMessage;
function generalMessage(replayJsonMessage,code,description){
    var merge = require('merge');
    var msg={
        code:code,
        description:description,
        
      
    }
    

    return merge(msg,replayJsonMessage);
}

function errorMessage(errorObj){
    var msg={
        code:errorObj.code,
        description:errorObj.reason,
        
      
    }
    return msg;
}