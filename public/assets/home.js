const onSearchFarcebook = (e) => {
    console.log('searching...' + e.target.value);
    e.preventDefault();
    if (e.key === 'Enter') {
        const search = e.target.value;
        if (search) {
            window.location.href = `/search/?q=${search}`;
        }
    }
}

const showHideComments = (id) => {
    const comments = document.getElementById(id);
    if (comments.style.display === 'none') {
        comments.style.display = 'block';
    } else {
        comments.style.display = 'none';
    }
}

const createReaction = (reaction) => {

    return (`<div class="comment">
                <div class="comment-author">
                    <img src="https://i.pravatar.cc/50?u=${reaction.username}" alt="" class="avatar">
                    <p>${reaction.username}</p>
                </div>
                <p>${reaction.reactionBody}</p>
            </div>`);
}

const loadMyPosts = async (numberOfPosts) => {

    // get friends list from the api
    const res = await fetch('/api/posts');
    const posts = await res.json();

    // Load a specific number unless -1, then load all
    if (numberOfPosts === -1) {
        numberOfPosts = posts.length;
    }

    // Populate the posts list
    loadPosts(posts, numberOfPosts);
}

const onLoadFriendsPosts = async (userId, numberOfPosts) => {

    // Load a specific number unless -1, then load all
    if (numberOfPosts === -1) {
        numberOfPosts = posts.length;
    }

    // get friends list from the api
    const res = await fetch(`/api/users/${userId}`);
    const user = await res.json();

    // Populate the posts list
    loadPosts(user.posts, numberOfPosts);
}

const loadPosts = async (posts, numberOfPosts) => {

    const postsList = document.getElementById('friends-posts');

    // clear the posts list
    postsList.innerHTML = '';

    // create a list of friends
    for (let i = 0; i < numberOfPosts; i++) {
        const post = posts[i];

        const timeFromNow = moment(post.createdAt).fromNow();

        // loop through the reactions and create a list of them
        let reactions = '';
        for (let j = 0; j < post.reactions.length; j++) {
            const reaction = post.reactions[j];
            reactions += createReaction(reaction);
        }

        // Create the Post HTML
        const postHtml = `<div class="post box">
                <div class="post-author">
                    <img src="https://i.pravatar.cc/50?u=${post.username}" alt="" class="avatar">
                        <div class="post-summary">
                            <div class="author">
                                ${post.username}
                            </div>
                            <div class="post-date">
                                <p>
                                    ${timeFromNow}
                                </p>
                            </div>
                        </div>
                </div>
                <div class="post-text">
                    <p>
                        ${post.commentText}
                    </p>
                </div>
                <div class="post-comments">
                    <p>
                        <a href="javascript:showHideComments('${post._id}_comments_container')">${post.reactionCount} comment${post.reactionCount === 1 ? '' : 's'}</a>
                    </p>
                    <div class="post-comments" id="${post._id}_comments_container" style="display:none;">
                        <div class="post-comments" id="${post._id}_comments">
                            ${reactions}
                        </div>
                        <div class="new-comment" id="${post._id}_new_comment">
                            <img src="https://i.pravatar.cc/50?u=samjas" alt="" class="avatar">
                            <input type="text" placeholder="Write a comment" onkeydown="onNewComment(event, '${post._id}')">
                        </div>
                    </div>
                </div>
            </div>`;
        postsList.innerHTML += postHtml;
    }
}

const onMoreFriends = () => {

    // Load all of the Friends
    loadFriendsList(-1)
}

const loadFriendsList = async (number) => {

    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = '';

    // get friends list from the api
    const res = await fetch('/api/users');
    const users = await res.json();

    // Load a specific number unless -1, then load all
    if (number === -1) {
        number = users.length;

        // Hide the button, we don't need it any more
        const moreFriends = document.getElementById('more-friends');
        moreFriends.style.display = 'none';
    }

    // create a list of friends
    for (let i = 0; i < number; i++) {
        const user = users[i];
        const friend = `<div class="friend-list-item" >
                <img src="https://i.pravatar.cc/50?u=${user.username}" alt="" class="avatar">
                    <div class="author">
                        <a href="#" onclick="onLoadFriendsPosts('${user._id}', 10);">${user.username}</a>
                    </div>
            </div>`;
        friendsList.innerHTML += friend;
    }
}

const onNewPost = async (e) => {

    if (e.key === 'Enter') {
        console.log('new post');
        const post = {
            commentText: document.getElementById('new-post-text').value,
            username: 'samjas',
            userId: '62d489cd51c2fedad274b1fd'
        }
        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        const data = await res.json();
        console.log(data);
        loadMyPosts(-1);
    }
}

const onNewComment = async (e, postId) => {

    if (e.key === 'Enter') {
        console.log('new comment', e.target.value, postId);
        const post = {
            reactionBody: e.target.value,
            username: 'tiamaria',
            userId: '62d489cd51c2fedad274b1fd'
        }
        const res = await fetch(`/api/posts/${postId}/reactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        // If everything is ok, add the new comment to the list of comments
        const data = await res.json();
        if (data) {
            const newCommentHtml = createReaction(post);

            const commentList = document.getElementById(`${postId}_comments`);
            commentList.innerHTML += newCommentHtml;

            // Clear the comment textbox
            e.target.value = '';
        }
    }
}


document.addEventListener("DOMContentLoaded", (event) => {

    // Set up Event Handlers
    const search = document.getElementById('search');
    search.addEventListener('keydown', onSearchFarcebook);

    const moreFriends = document.getElementById('more-friends');
    moreFriends.addEventListener('click', onMoreFriends);

    const newPost = document.getElementById('new-post-text');
    newPost.addEventListener('keydown', onNewPost);

    // Load friends list
    loadFriendsList(10);

    // Load posts
    loadMyPosts(10);
});
