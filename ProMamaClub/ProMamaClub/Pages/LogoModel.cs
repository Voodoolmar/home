namespace ProMamaClub.Pages
{
	public class LogoModel
	{
		public int Width { get; }
		public int Height { get; }

		public LogoModel(int height, int width = 0)
		{
			Width = width;
			Height = height;
		}
	}
}