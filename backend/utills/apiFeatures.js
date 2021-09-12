class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.querySrt = queryStr;
  }

  // Search Methods
  search() {
    // if true search in database by name = keyword
    const keyword = this.querySrt.keyword
      ? {
          name: { $regex: this.queryStr.keyword },
          $options: "i",
        }
      : {};
    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
}

module.exports = APIFeatures;
