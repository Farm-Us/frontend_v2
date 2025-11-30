// 저장 처리하는 맵핑 로직
export const dataLogics = (producerId, data) => {
  console.log('parsing...: ', data);
  if (!data) {
    return null;
  }
  const now = new Date();
  return {
    producerId: producerId,
    // categoryId: findCategoryNo(data?.category),
    categoryId: 1,
    itemName: data?.itemName,
    itemPrice: Number(data?.options[0].price), // 옵션의 첫번째 값 가격 (숫자로 변환)
    discountRate: parseInt(data?.discount), // 할인율 숫자로 변환
    description: 'desciption',
    origin: data?.details[0]?.title,
    originDetails: data?.details[0]?.content,
    farmingMethod: data?.details[1]?.title,
    farmingDetails: data?.details[1]?.content,
    manageMethod: data?.details[2]?.title,
    manageDetails: data?.details[2]?.content,
    packageMethod: data?.details[3]?.title,
    packageDetails: data?.details[3]?.content,
    expirationDate: now.toLocaleDateString(),
    storageMethod: '냉장보관',
    itemStatus: 'AVAILABLE',
    stockQuantity: 100,
    subCategoryIds: [1],
    options: data?.options?.map((option) => ({
      optionName: option.name, // name → optionName
      optionValue: option.value, // value → optionValue
      itemPrice: Number(option.price), // price → itemPrice (숫자로 변환)
    })),
    originImage: data?.details[0]?.image,
    farmingImage: data?.details[1]?.image,
    manageImage: data?.details[2]?.image,
    packageImage: data?.details[3]?.image,
    thumbnailImage: data?.mainImage,
  };
};

export const findCategoryNo = (category, list) => {
  const index = list.indexOf(category);
  return index === -1 ? 1 : index + 1;
};
