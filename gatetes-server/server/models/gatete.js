'use strict';

module.exports = function(CatPost) {
    CatPost.disableRemoteMethodByName('replaceOrCreate');
    CatPost.disableRemoteMethodByName('patchOrCreate');
    CatPost.disableRemoteMethodByName('exists');
    CatPost.disableRemoteMethodByName('upsertWithWhere');
    CatPost.disableRemoteMethodByName('findOne');
    CatPost.disableRemoteMethodByName('count');
    CatPost.disableRemoteMethodByName('createChangeStream');
    CatPost.disableRemoteMethodByName('updateAll');
    CatPost.disableRemoteMethodByName('replaceOrCreate');
};
