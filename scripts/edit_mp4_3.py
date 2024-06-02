import ffmpeg

def concatenate_videos(output_file, *input_files):
    input_txt = 'input.txt'
    with open(input_txt, 'w') as f:
        for file in input_files:
            f.write(f"file '{file}'\n")

    (
        ffmpeg
        .input(input_txt, format='concat', safe=0)
        .output(output_file, c='copy')
        .run()
    )

# Define the input files, trimmed output files, and final combined output file
input_file1 = './3284-Rebarrel_Blueprint-Part1.mp4'
input_file2 = './3284-Rebarrel_Blueprint-Part2.mp4'
combined_output = './3284-Rebarrel_Blueprint.mp4'


# Combine the trimmed videos
concatenate_videos(combined_output, input_file1, input_file2)