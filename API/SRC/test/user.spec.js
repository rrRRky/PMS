var chai = require('chai')
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

//#########----ASSERT----##########
// describe('####--------assert check----###',function(){
//     let username="deepak";
//     let mylist={
//         item:[{
//             id:1,name:'deepak ruhela'
//         }],
//         title:'user list'
//     }
//     it("check string",function(){
//         assert.typeOf(username,'string');
//     })

//     it("check equal",function(){
//         assert.equal(username,'deepak');
//     })

//     it("check length",function(){
//         assert.lengthOf(mylist.item,1);
//     })
// })

//#########----Should Check----##########
// describe('####--------Should Check----###',function(){
//     let username="deepak";
//     let mylist={
//         item:[{
//             id:1,name:'deepak ruhela',
//             id:2,name:'deepak '
//         }],
//         title:'user list'
//     }
//     it("check string",function(){
//         username.should.be.a('string');
//     })

//     it("check equal",function(){
//         username.should.equal('deepak');
//     })

//     it("check length",function(){
//     mylist.should.have.property('item').with.lengthOf(2)
//     })
// })

//#########----expect Check----##########
describe("------------expect check--------", function(){
    let username="deepak ruhela"
    let mylist={
        item:[{
            id:1,name:"deepak ruhela"
        }],
        tital:'user list',
        addresh:{
            country:"India",
            phon_no:['9808194836','6396789240']
        }
       

    }
    it('chek strind', function(){
        expect(username). to.be.a('string');
    })

    it('chek Equal', function(){
        expect(username). to.equal('deepak ruhela');
    })

    it('chek length', function(){
        expect(username). to.length(13);
    })

    it('chek match', function(){
        expect(mylist).to.have.property('item').with.length(1);
    })

    it('api object match', function(){
        expect(mylist).to.have.all.keys('item','tital','addresh');
    })

    it('api nested object match', function(){
        expect(mylist).to.have.nested.property('addresh.phon_no[0]');
    })

    it('api nested KeyValue match', function(){
        expect(mylist).to.have.nested.include({'addresh.country':'India'});
    })
})