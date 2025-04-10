const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');

describe('Users API', () => {
  let testUserId;

  // Test GET /users
  describe('GET /users', () => {
    it('should get all users', async () => {
      const res = await request(app)
        .get('/users')
        .expect(200);
      
      expect(res.body).to.be.an('array');
    });
  });

  // Test POST /users
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const user = {
        name: 'Test User',
        email: 'test@example.com'
      };

      const res = await request(app)
        .post('/users')
        .send(user)
        .expect(201);

      testUserId = res.body.id; // Save for later tests
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.equal(user.name);
      expect(res.body.email).to.equal(user.email);
    });

    it('should not create a user without required fields', async () => {
      await request(app)
        .post('/users')
        .send({})
        .expect(500);
    });
  });

  // Test PUT /users/:id
  describe('PUT /users/:id', () => {
    it('should update an existing user', async () => {
      const updatedUser = {
        name: 'Updated User',
        email: 'updated@example.com'
      };

      await request(app)
        .put(`/users/${testUserId}`)
        .send(updatedUser)
        .expect(200);
    });

    it('should handle updating non-existent user', async () => {
      const updatedUser = {
        name: 'Updated User',
        email: 'updated@example.com'
      };

      await request(app)
        .put('/users/999999')
        .send(updatedUser)
        .expect(500);
    });
  });

  // Test DELETE /users/:id
  describe('DELETE /users/:id', () => {
    it('should delete an existing user', async () => {
      await request(app)
        .delete(`/users/${testUserId}`)
        .expect(200);
    });

    it('should handle deleting non-existent user', async () => {
      await request(app)
        .delete('/users/999999')
        .expect(500);
    });
  });
});