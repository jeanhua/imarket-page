export class ImageUtil {
    public static compressAndAddWatermark(imageFile: File, watermarkText: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                img.onload = () => {
                    // 获取图片原始宽高
                    const originalWidth = img.width;
                    const originalHeight = img.height;

                    // 设置压缩比例
                    const maxWidth = 1024;
                    const maxHeight = 1024;

                    // 计算压缩后的宽高
                    let width = originalWidth;
                    let height = originalHeight;
                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        width = width * ratio;
                        height = height * ratio;
                    }

                    // 创建一个canvas元素
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        reject('无法获取canvas的context');
                        return;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    // 在canvas上绘制压缩后的图片
                    ctx.drawImage(img, 0, 0, width, height);

                    // 判断是否需要添加水印：如果图片宽度和高度都大于一个阈值才添加水印
                    const minWidthForWatermark = 300;  // 设定水印的最小宽度阈值
                    const minHeightForWatermark = 300; // 设定水印的最小高度阈值

                    if (width >= minWidthForWatermark && height >= minHeightForWatermark) {
                        // 添加水印
                        ctx.font = 'bold 36px "Helvetica Neue", Arial, sans-serif';
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        // 水印位置：右下角
                        const margin = 20;
                        const x = width - margin - 200;  // 距离右边20px，宽度限制200px
                        const y = height - margin - 30;  // 距离下边20px

                        // 加入阴影效果
                        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                        ctx.shadowOffsetX = 2;
                        ctx.shadowOffsetY = 2;
                        ctx.shadowBlur = 3;

                        // 绘制水印文字
                        ctx.fillText(watermarkText, x, y);

                        // 去掉阴影
                        ctx.shadowColor = 'transparent';
                    }

                    // 压缩图片并返回base64编码
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    // 限制大小
                    if (dataUrl.length <= 4 * 1024 * 1024) {
                        resolve(dataUrl);
                    } else {
                        reject('图片过大！');
                    }
                };

                img.src = e.target!.result as string;
            };

            reader.onerror = () => {
                reject('图片加载失败');
            };
            reader.readAsDataURL(imageFile);
        });
    }
}
