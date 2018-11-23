class ViewForm extends BaseForm {
    init(article) {
        this.renderWithModel(article);

        article.viewCount += 1;
    }

    getTemplate() {
      return `<div class="panelArticle">
        <label for="title-label">Title: </label>
        <span id="title-label" name="title-label" type="text"> {{ title }} </span> <br/>

        <label for="content-label">Content: </label>
        <span id="content-label" name="content-label" type="text"> {{ content }} </span> <br/>

        <label for="author-label">Author: </label>
        <span id="author-label" name="author-label" type="text"> {{ author }}  </span> <br/>

        <label for="email-label">Email: </label>
        <span id="email-label" name="email-label" type="text"> {{ email }}  </span> <br/>


        <label for="updated-date-label">Updated Date: </label>
        <span id="updated-date-label" name="updated-date-label" type="text">  {{ updatedDate }} </span> <br/>


        <label for="view-count-label">View Count: </label>
        <span id="view-count-label" name="view-count-label" type="text">  {{ viewCount }} </span> <br/>
    </div>`;
    }
}