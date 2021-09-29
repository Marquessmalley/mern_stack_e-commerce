class APIFeatures {
  constructor(query, queryStr) {
    // Product.find()
    this.query = query;
    // ?keyword=apple
    this.queryStr = queryStr;
  }

  // Search Method
  search() {
    // if keyword true search in database by name = keyword
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // filter method
  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing fields from query
    const removeFeilds = ["keyword", "limit", "page"];
    removeFeilds.forEach((el) => delete queryCopy[el]);

    // Advanced filter for price ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // pagination method
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
