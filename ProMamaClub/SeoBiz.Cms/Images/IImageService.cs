namespace SeoBiz.Cms.Images
{
	public interface IImageService
	{
		void CropAndResize(string inputPath, string outputPath, int sourceX, int sourceY, int sourceWidth, int sourceHeight, int destinationWidth, int destinationHeight);
	}
}