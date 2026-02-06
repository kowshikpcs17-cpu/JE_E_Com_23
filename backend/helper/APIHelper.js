class APIHelper {
  constructor(query, querystr) {
    this.query = query; //MongoDB Query
    this.querystr = querystr; // Query String from URL
  }

  search() {
    if (this.querystr && this.querystr.keyword) {
      this.query = this.query.find({
        name: { $regex: this.querystr.keyword, $options: "i" },
      });
    }
    return this;
  }

  //http://localhost:8000/api/v1/products?category=Phone&keyword=lenovo&page=1&limit=5
  filter() {
    if (!this.querystr) return this;

    const queryCopy = { ...this.querystr };
    ["keyword", "page", "limit"].forEach((key) => delete queryCopy[key]);

    this.query = this.query.find(queryCopy);
    return this;
  }

  paginate(resultPerPage) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default APIHelper;
