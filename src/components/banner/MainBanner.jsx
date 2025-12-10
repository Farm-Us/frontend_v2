// 2. 메인 배너
function MainBanner({ mainBannerImg, userAvatarImg }) {
  return (
    // 👇 배너 높이를 h-48 (192px) -> h-96 (384px)으로 수정하여 이미지가 잘리지 않게 함
    <section className='relative text-white rounded-lg overflow-hidden '>
      <img src={mainBannerImg} alt='메인 배너' className='w-full h-full object-cover' />
      <div className='absolute inset-0 bg-opacity-40 p-5 flex flex-col justify-end gap-[12px] px-[24px] py-[21px]'>
        <h2 className='text-[22px] font-semibold '>
          그물 올릴 때의 손맛, 아직 살아<br/>있습니다.
        </h2>
        <div className='flex items-center'>
          <img
            src={userAvatarImg}
            alt='사용자 아바타'
            className='w-8 h-8 rounded-full object-cover'
          />
          <span className='ml-2 font-semibold'>해풍 세월</span>
        </div>
      </div>
    </section>
  );
}

export default MainBanner;
