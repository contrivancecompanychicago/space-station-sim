import ui from 'reducer/ui';

describe('reducers/ui', () => {
  it('should be defined', () => {
    expect(typeof ui).toBe('function');
  });

  describe('defaults', () => {
    let out = {}
    beforeEach(() => {
      out = ui({}, {type:'NOTHING'});
    })
    it('should set block to plain', () => {
      expect(out.block).toBe('plain');
    });
    it('should set item to dockingbay', () => {
      expect(out.item).toBe('dockingbay');
    });
    it('should set mode to block', () => {
      expect(out.mode).toBe('block');
    });
    it('should set room to shop', () => {
      expect(out.room).toBe('shop');
    });
  });

  describe('UI_SELECT_BLOCK', () => {
    it('should set block', () => {
      expect(ui({}, {type:'UI_SELECT_BLOCK', id: 'dummy'}).block).toBe('dummy');
    });
  });
  describe('UI_SELECT_ITEM', () => {
    it('should set item', () => {
      expect(ui({}, {type:'UI_SELECT_ITEM', id: 'dummy'}).item).toBe('dummy');
    });
  });
  describe('UI_SELECT_MODE', () => {
    it('should set mode', () => {
      expect(ui({}, {type:'UI_SELECT_MODE', id: 'dummy'}).mode).toBe('dummy');
    });
  });
  describe('UI_SELECT_ROOM', () => {
    it('should set room', () => {
      expect(ui({}, {type:'UI_SELECT_ROOM', id: 'dummy'}).room).toBe('dummy');
    });
  });

})
