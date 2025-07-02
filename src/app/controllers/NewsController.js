class NewsController {
  // Các phương thức xử lý cho controller này

  //[GET]/ news
  index(req, res) {
    res.render('news');
  }

  //[GET] /news/slug
  show(req, res){
    res.send('NEWS DETAIL');
  }

}

module.exports = new NewsController;


