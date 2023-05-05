/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list:(req,res)=>{
        Articles.find().exec((err,articles)=>{
            if(err){
                res.send(500, {error : 'Database error'});
            }
            res.view('pages/list', {articles : articles});
        });
    },
    add:(req,res)=> {
        res.view('pages/add');
    },
    create:(req,res)=> {
        let title = req.body.title;
        let body = req.body.body;

        Articles.create({title:title, body:body}).exec((err)=>{
            if(err){
                res.send(500,{error: 'Database Error'});
            }
            res.redirect('/articles/list');
        })
    },
    delete:(req,res)=> {
        Articles.destroy({id: req.params.id}).exec((err)=>{
            if(err){
                res.send(500,{error: 'Database Error'});
            }
            res.redirect('/articles/list');
        });
        return false;
    },
    edit:(req,res)=>{
        Articles.findOne({ id:req.params.id}).exec((err,article)=>{
            console.log(article);
            if(err){
                res.send(500,{error: 'Database Error'});
            }
            res.view('pages/edit',{article : article});
        });
    },
    update: (req,res)=> {
        let data = {title,body} = req.body;

        Articles.update({id: req.params.id},{title:data.title, body:data.body}).exec((err)=>{
            if(err){
                res.send(500,{error: 'Database Error'});
            }
            res.redirect('/articles/list');
        });
        return false;
    }
};
