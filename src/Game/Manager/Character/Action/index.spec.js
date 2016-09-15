import actions from 'Game/Manager/Character/Action';

describe('actions', () => {
  it('shuld be an obj', () => {
    expect(actions.wander).toBeDefined();
    console.log(actions);
  });
});
