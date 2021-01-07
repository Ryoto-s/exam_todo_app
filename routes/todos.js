var express = require('express');
const db = require('../models');
const app = require('../app');
var router = express.Router();


// 一覧
router.get('/', function(req, res) {
    db.todo.findAll().then(function (results) {
        res.render('todos/index', { todos: results });
    });
});

// 個別


// 新規作成ページ


// 作成してリダイレクトする処理 !
router.post('/', function(req, res) {
    const values = {
        content: req.body.todoContent
    };
    db.todo.create(values).then(function (results) {
        res.redirect('/todos');
    });
});

// 編集画面表示 !
router.get('/:id/edit', function(req,res) {
    db.todo.findByPk(req.params.id).then(function (results) {
        res.render('todos/edit', {todo: results});
    });
});

// 更新処理 !
router.put('/:id', function(req, res) {
    const values = {
        content: req.body.todoContent
    };
    const options = {
        where: {
            id: req.params.id
        }
    };
    db.todo.update(values, options).then(function (results) {
        res.redirect('/todos')
    });
});

// 削除 !
router.delete('/:id', function(req, res) {
    // 表示と動作のパスは同じでなくてよい、画面のformタグのactionと一致する必要がある
    const options = {
        where: {
            id: req.params.id
        }
    };
    db.todo.destroy(options).then(function (results) {
        res.redirect('/todos');
    });
});

module.exports = router;