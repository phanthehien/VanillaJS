class CreateForm extends BaseForm {
  init(articles) {
    this.articles = articles;
    this.startCreateNewForm();
  }

  submitArticleButtonClick() {
    this.addArticle();
  }

  addArticle() {
    const title = this.app.getElement("title");
    const content = this.app.getElement("content");
    const author = this.app.getElement("author");
    const email = this.app.getElement("email");

    if (!title.value || !content.value || !author.value || !email.value) {
      alert("Please input all value");
      return;
    }

    const article = {
      id: guid(),
      title: encodeURI(title.value),
      content: encodeURI(content.value),
      author: encodeURI(author.value),
      email: encodeURI(email.value),
      updatedDate: formatDate(new Date()),
      viewCount: 0
    };

    this.articles.unshift(article);
    this.app.switchToListScreen();
  }

  startCreateNewForm() {
    const titleInput = this.app.getElement("title");
    const contentInput = this.app.getElement("content");
    const authorInput = this.app.getElement("author");
    const emailInput = this.app.getElement("email");
    const submitArticleButton = this.app.getElement("submit-article-btn");

    titleInput.value = "";
    contentInput.value = "";
    authorInput.value = "";
    emailInput.value = "";

    submitArticleButton.value = "Create";
    let self = this;
    submitArticleButton.addEventListener("click", function() {
      self.submitArticleButtonClick();
    });
  }

  getTemplate() {
    return `<div class="tableArticle">
        <form>
            <label>Title</label>
            <input class="title" name="title" type="text" value="{{ title }}">

            <label>Content</label>
            <textarea class="content" name="content">{{ content }}</textarea>

            <label>Author</label>
            <input class="author" name="author" type="text" value="{{ author }}">

            <label>Email</label>
            <input class="email" name="email" type="text" value="{{ email }}">

            <input class="submit-article-btn" type="button" value="Create">
        </form>
    </div>`;
  }
}
