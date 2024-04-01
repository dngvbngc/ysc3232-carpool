To run the application, first clone the repository to your local machine with the .env environment file. Then run the command 

```
npm run dev
```

To log in, you may use the default credentials:
```
Email: user@nextmail.com
Password: 123456
```

DONE:
- User sign in, sign out, sign up
- Dashboard page (Showing total counts and latest posts)
- Post table & Text search
- Create & Edit post
- Profile page
- Map Search with Google API (text interface)

TODOs:
- Post-related actions:
 + For the page for each post, show the basic data and comments 
 + Input field & Button to create comments
 _ Show existing comments. Each comment must also have edit/delete button (like on the posts table). If no time, only delete is needed.

- Authorization for authors vs onlookers:
 + When creating/updating a new post, instead of selecting an author, the logged in user ID is already keyed in
 + Authors can edit post, onlookers can heart/follow a post. This will show up on their profile tab as “Following”

- Map search:
 + Add native map interface

- Front-end:
 + Design webpage (color, fonts, etc)
 + Make sure all input fields are formatted (create post, edit post)
 + Fix the fallback skeletons to match with the page layout

- Stretch goals:
 + Allow user’s profile editing
 + Implement reply to comment (tag OG commenter’s name to the front)
 + Implement notification box & Send notifications when a relevant post have been edited/new comments
