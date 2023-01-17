
class Likes
{
    static NAME_LIKE = 'like';
    static NAME_DISLIKE = 'dislike';

    static create()
    {
        return $('.b_likes')
            .map((index, elem) =>
            {
                return new Likes($(elem));
            })
            .toArray();
    }

    /**
     * @param {JQuery} $context
     */
    constructor ($context)
    {
        /**@see https://gist.github.com/sshmyg/0551da90a09f14d100c5b1e6350ee689 */
        this._id = `f${(+new Date).toString(16)}`;

        $context.attr('id', this.id);

        this._likes     = parseInt(this.$context.find('.like .counter').text());
        this._dislikes  = parseInt(this.$context.find('.dislike .counter').text());

        if (this.$context.find('.like').hasClass('selected'))
        {
            this._selected = Likes.NAME_LIKE;
        } else if (this.$context.find('.dislike').hasClass('selected')) {
            this._selected = Likes.NAME_DISLIKE;
        } else {
            this._selected = null;
        }

        $('body').on('click', `${this.selector} button`, (e) =>
        {
            let $button = $(e.currentTarget);

            if ($button.hasClass('like'))
            {
                this.clickLike();

            } else if ($button.hasClass('dislike'))
            {
                this.clickDislike();
            }
        });
    }

    clickLike()
    {
        if (this.selected === Likes.NAME_LIKE)
        {
            this.selected = null;

            this.decrementLike();
        } else if (this.selected === Likes.NAME_DISLIKE)
        {
            this.selected = Likes.NAME_LIKE;

            this.decrementDislike();
            this.incrementLike();

        } else {
            this.selected = Likes.NAME_LIKE;

            this.incrementLike();
        }
    }

    clickDislike()
    {
        if (this.selected === Likes.NAME_LIKE)
        {
            this.selected = Likes.NAME_DISLIKE;

            this.decrementLike();
            this.incrementDislike();

        } else if (this.selected === Likes.NAME_DISLIKE)
        {
            this.selected = null;

            this.decrementDislike();
        } else {
            this.selected = Likes.NAME_DISLIKE;

            this.incrementDislike();
        }
    }

    incrementLike()
    {
        //отправить на сервер, что добавился 1 лайк
        this.likes = this.likes + 1;
    }

    decrementLike()
    {
        this.likes = this.likes - 1;
    }

    incrementDislike()
    {
        this.dislikes = this.dislikes + 1;
    }

    decrementDislike()
    {
        this.dislikes = this.dislikes - 1;
    }

    get id()
    {
        return this._id;
    }

    get selector()
    {
        return `#${this.id}`;
    }

    get $context()
    {
        return $(this.selector);
    }

    get likes()
    {
        return this._likes;
    }

    set likes(likes)
    {
        this._likes = likes;

        this.update();
    }

    get dislikes()
    {
        return this._dislikes;
    }

    set dislikes(dislikes)
    {
        this._dislikes = dislikes;

        this.update();
    }

    get selected()
    {
        return this._selected;
    }

    set selected(selected)
    {
        this._selected = selected;

        this.update();
    }

    update()
    {
        this.$context.replaceWith(
            this.render()
        );
    }

    render()
    {
        return `
        <div 
            id="${this.id}"
            class="b_likes"
            >
        
            <button 
                class="
                    like 
                    ${this.selected === Likes.NAME_LIKE ? 'selected' : ''}
                "
            >
                <i class="icon"></i>
                <span class="counter">${this.likes}</span>
            </button>
            
            <button 
                class="
                    dislike
                    ${this.selected === Likes.NAME_DISLIKE ? 'selected' : ''}
                "
            >
                <i class="icon"></i>
                <span class="counter">${this.dislikes}</span>
            </button>
            
        </div>
        `;
    }
}