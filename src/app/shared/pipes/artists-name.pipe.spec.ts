import { ArtistsNamePipe } from './artists-name.pipe';

describe('ArtistsNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ArtistsNamePipe();
    expect(pipe).toBeTruthy();
  });
});
