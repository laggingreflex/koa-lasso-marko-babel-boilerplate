import bcrypt from 'bcrypt-as-promised';
import shortid from 'shortid';
import { extend } from 'lodash';

import { db } from './';

export default class User {
  constructor(data) {
    this.id = shortid.generate();
    extend(this, data);
    if (this.password)
      throw new Error('Please remove the `.password` property and use `.savePassword(password)` (to save the hash) instead');
  }
  async save() {
    console.log('Saving user');
    try {
      await db.hmset('user:' + this.id, this);
    } catch (err) {
      console.error('Use not saved. Error:', err.message);
      throw err;
    }
    console.log('Use saved');
    return this;
  }
  async savePassword(password) {
    var hash = await bcrypt.hash(password, 8);
    this.hash = hash;
    await this.save();
    return this;
  }
  async verifyPassword(password) {
    try {
      await bcrypt.compare(password, this.hash);
      return true;
    } catch (err) {
      return false;
    }
  }
  static async findById(id) {
    return db.hgetall('user:' + id);
  }
  static async findByUsername(username) {
    // This could get complicated with redis...
    // console.log('finding by username:', username);
    // db.keys('usera:*', (err, users) => {
    //   if (err) return cb(err);
    //   if (!users || !users.length) return cb();
    //   for (let i = 0; i < users.length; i++) {
    //     users[i]
    //   };
    //   console.log('err:', err);
    //   console.log('users:', users);
    //   // if (err) return cb(err);
    //   // if (!users) return cb();
    // });
  }
}
