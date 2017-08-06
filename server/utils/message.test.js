var expect = require('expect')

var {generateMessage} = require('./message')

describe('Generate Message', () => {
    it('should generate the correct message object', () => {
        var from = 'jen';
        var text = 'Hello there';
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    } )
})