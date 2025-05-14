import { test, expect } from '../../fixtures/pageFixtures';import { postSchema } from '../../schemas/postSchema';

test.describe.parallel(
  'JSON Placeholder /POST API',
  { tag: '@api-core' },
  () => {
    test(
      'GET /posts- should return a list of posts',
      { tag: '@regression' },
      async ({ postsAPI }) => {
        const response = await postsAPI.getAllPosts();
        expect(response.status()).toBe(200);
        expect(
          response.ok(),
          `Response not ok Status: ${response.status()}`
        ).toBeTruthy();

        // assert on body
        const body = await response.json();
        expect(Array.isArray(body)).toBeTruthy();

        expect(body.length).toBeGreaterThan(0);
        if (body.length > 0) {
          expect(postSchema.safeParse(body[0])).toBeTruthy();
          expect(body[0]).toHaveProperty('userId');
          expect(body[0]).toHaveProperty('id');
          expect(body[0]).toHaveProperty('title');
          expect(body[0]).toHaveProperty('body');
        }
      }
    );
    test(
      'GET /Posts/{id}- should return a single post',
      { tag: '@regression' },
      async ({ postsAPI }) => {
        const idToFetch = 1;
        const response = await postsAPI.getPostById(idToFetch);
        expect(response.status()).toBe(200);
        expect(
          response.ok(),
          `Response not ok Status: ${response.status()}`
        ).toBeTruthy();

        const body = await response.json();
        expect(postSchema.safeParse(body)).toBeTruthy();
        expect(body).toHaveProperty('userId');
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('body');
      }
    );

    test(
      'POST /posts- should create a new post',
      { tag: '@smoke' },
      async ({ postsAPI }) => {
        const newPost = {
          title: 'title',
          body: 'body',
          userId: 1
        };
        const response = await postsAPI.createPost(newPost);
        expect(response.status()).toBe(201);
        expect(
          response.ok(),
          `Response not ok Status: ${response.status()}`
        ).toBeTruthy();
      }
    );

    test(
      'PUT /posts/{id}- should update a post',
      { tag: '@regression' },
      async ({ postsAPI }) => {
        const idToUpdate = 6;
        const updatedPost = {
          id: idToUpdate,
          title: 'updatetitle',
          body: 'update body',
          userId: 2
        };
        const response = await postsAPI.updatePost(updatedPost);
        expect(response.status()).toBe(200);
        expect(
          response.ok(),
          `Response not ok Status: ${response.status()}`
        ).toBeTruthy();
      }
    );

    test(
      'DELETE /posts/{id}- should delete a post',
      { tag: '@regression' },
      async ({ postsAPI }) => {
        const idToDelete = 6;
        const response = await postsAPI.deletePost(idToDelete);
        expect(response.status()).toBe(200);
        expect(
          response.ok(),
          `Response not ok Status: ${response.status()}`
        ).toBeTruthy();
      }
    );

    test(
      'GET non-existent id',
      { tag: '@regression' },
      async ({ postsAPI }) => {
        const idToDelete = 1000000000;
        const response = await postsAPI.getPostById(idToDelete);
        expect(response.status()).toBe(404);
        expect(
          response.ok(),
          `Response not ok Status: ${response.status()}`
        ).toBeFalsy();
      }
    );
  }
);
