class ListForm extends BaseForm {
    init(articles) {
        this.articles = articles;

        this.pagingValues = [1, 2, 3, 5, 7, 9];
        this.numberOfList = this.pagingValues[2];
        this.currentPaging = 0;
        const self = this;

        const newArticleBtnUI = this.app.getElement('new-article-btn');
        newArticleBtnUI.addEventListener("click", function() {
            self.newArticleButtonClick();
        });

        const tableArticle = this.app.getElement('article-list');
        tableArticle.addEventListener("click", function(e) {
            self.handleTableClick(e);
        });

        this.paginationListItemTemplate =  this.app.getElement('template-dropdown-list-item');
        this.paginationItemTemplate =  this.app.getElement('template-pagination-item');

        this.bodyArticle =  this.app.getElement('article-body');
        this.rowTemplate =  this.app.getElement('template-row-item');
        this.paginationList = this.app.getElement("dropdown-content");
        this.articlePagination = this.app.getElement('article-pagination');
        this.paginationLabelButton = this.app.getElement("pagination-label-btn");

        this.pagination = this.app.getElement("pagination");
        this.pagination.addEventListener("click", function(e) {
            self.handlePaginationClick(e);
        });

        this.reloadArticleList();
    }

    handlePaginationClick(event) {
        if (event.target.dataset) {
            const { index, action } = event.target.dataset;

            switch (action) {
                case 'actionDropdown':
                    this.numberOfList = parseInt(index);
                    this.currentPaging = 0;
                    this.reloadArticleList();
                    break;

                case 'actionPagination':
                    this.currentPaging = parseInt(index - 1);
                    this.reloadArticleList();
                    break;

                default:
                    break;
            }
        }
    }

    handleTableClick(event) {
        if (event.target.dataset) {
            const { action, id } = event.target.dataset;
            const article = this.articles.find(article => article.id === id);

            switch (action) {
                case 'actionView':
                    this.app.switchToViewScreen(article);
                    break;

                case 'actionEdit':
                    this.app.switchToEditScreen(article);
                    break;

                case 'actionDelete':
                    this.deleteArticle(article);
                    break;

                default:
                    break;
            }
        }
    }

    newArticleButtonClick() {
       this.app.switchToCreateScreen();
    }

    deleteArticle(article) {
        const { title, id } = article;
        const result = confirm('are you sure to delete this article: \n ' +  title + ' ?');

        if (result === true) {
            const index = this.articles.findIndex(article => article.id === id);
            this.articles.splice(index, 1);
            this.reloadArticleList();
        }
    }

    reloadArticleList() {
        const skip = this.currentPaging * this.numberOfList;
        const endIndex = Math.min(skip + this.numberOfList, this.articles.length);
        const model = {
            articles: this.articles.slice(skip, endIndex).map(article => {
                let newArticle = article;
                newArticle.shortContent = decodeURI(getSubString(article.content));
                newArticle.author = decodeURI(article.author);
                newArticle.email = decodeURI(article.email);
                newArticle.title = decodeURI(article.title);
                newArticle.content = decodeURI(article.content);

                return newArticle;
            })
        };

        const htmlContent = this.getRenderedHtml(this.rowTemplate.innerHTML, model);
        this.bodyArticle.innerHTML = htmlContent;

        this.createPagination();
    }

    createPagination() {
        this.paginationLabelButton.innerHTML = 'Number of Items: ' + this.numberOfList;

        this.createDropdown();
        this.createPaginationItems();
    }

    createDropdown() {
        const paginationListItemsModel = {
            paginationListItems: this.pagingValues
        };

        const paginationListHtml = this.getRenderedHtml(this.paginationListItemTemplate.innerHTML, paginationListItemsModel);
        this.paginationList.innerHTML = paginationListHtml;
    }

    createPaginationItems() {
        const numberOfPaging = Math.ceil(this.articles.length / this.numberOfList);
        const paginationItemsModel = {
            paginationItems: []
        };


        for(let i = 0; i < numberOfPaging; i++) {
            paginationItemsModel.paginationItems.push(i + 1);
        }

        const paginationsHtml = this.getRenderedHtml(this.paginationItemTemplate.innerHTML, paginationItemsModel);
        this.articlePagination.innerHTML = paginationsHtml;
    }

    getTemplate() {
      return `<div class="panelNew">
    <input class="new-article-btn" type="button" value="Create Article" />
  </div>
    <table class="article-list">
        <thead>
          <th>Title</th>
          <th>Content</th>
          <th>Author</th>
          <th>Email</th>
          <th>Updated</th>
          <th>ViewCount</th>
          <th>Actions</th>
        </thead>
        <tbody class="article-body">
            <script class="template-row-item" type="text/template">
                <!-- {{ #articles }} -->
                <tr>
                    <td data-label="Title"> {{ title }} </td>
                    <td data-label="Content"> {{ shortContent }} </td>
                    <td data-label="Author"> {{ author }} </td>
                    <td data-label="Email"> {{ email }} </td>
                    <td data-label="Updated"> {{ updatedDate }} </td>
                    <td data-label="ViewCount"> {{ viewCount }} </td>
                    <td data-label="Actions">
                        <span data-id="{{ id }}" data-action="actionView" class="action"> View </span>
                        <span data-id="{{ id }}" data-action="actionEdit" class="action"> Edit </span>
                        <span data-id="{{ id }}" data-action="actionDelete" class="action"> Delete </span>
                    </td>
                </tr>
                <!--  {{ /articles }} -->
            </script>
        </tbody>
   </table>

   <div class="pagination">
     <div class="article-number-select">
       <button class="pagination-label-btn"></button>
       <div class="dropdown-content">
           <script class="template-dropdown-list-item" type="text/template">
               <!-- {{ #paginationListItems }} -->
                <p data-index="{{ . }}" data-action="actionDropdown"> {{ . }} </p>
               <!--  {{ /paginationListItems }} -->
            </script>
        </div>
     </div>
    <div class="article-pagination">
        <script class="template-pagination-item" type="text/template">
            <!-- {{ #paginationItems }} -->
            <a data-index="{{ . }}" data-action="actionPagination"> {{ . }} </a>
            <!--  {{ /paginationItems }} -->
        </script>
    </div>
   </div>`;
    }
}