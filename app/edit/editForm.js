class EditForm extends BaseForm {
    init(articles, article) {
        this.article = article;
        this.articles = articles;

        this.renderWithModel(article);

        const submitArticleButton = this.app.getElement("submit-article-btn");
        submitArticleButton.value = 'Save changes';

        const self = this;
        submitArticleButton.addEventListener('click', function () {
            self.saveArticle();
        })
    }

    saveArticle() {
        const article = this.articles.find(article => article.id === this.article.id);

        if (article) {
            const titleInput = this.app.getElement("title");
            const contentInput = this.app.getElement("content");
            const authorInput = this.app.getElement("author");
            const emailInput = this.app.getElement("email");
            const submitArticleButton = this.app.getElement("submit-article-btn");

            article.title = encodeURI(titleInput.value);
            article.content = encodeURI(contentInput.value);
            article.author = encodeURI(authorInput.value);
            article.email = encodeURI(emailInput.value);
            article.updatedDate = formatDate(new Date());

            submitArticleButton.value = 'Save changes';
            this.app.switchToListScreen();
        }
    }

    getTemplate() {
      return `<div class="tableArticle">
        <form>
            <label>Title</label>
            <input class="title title_element" name="title" type="text" value="{{ title }}">

            <label>Content</label>
            <textarea class="content" name="content">{{ content }}</textarea>

            <label>Author</label>
            <input class="author" name="author" type="text" value="{{ author }}">

            <label>Email</label>
            <input class="email" name="email" type="text" value="{{ email }}">

            <input class="submit-article-btn" type="button" value="Save Changes">
        </form>
    </div>`
    }
}