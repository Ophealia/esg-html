import React from "react";
import { FaTree, FaUsers, FaGavel, FaThumbsUp } from 'react-icons/fa';

interface ESGScoreProps {
  rating: string;
  overallScore: number;
  environmentScore: number;
  socialScore: number;
  governanceScore: number;
}

const getLevelRecommendation = (rating: string) => {
  switch (rating) {
    case "AAA":
      return "The company excels in ESG, setting a high benchmark for sustainability and social responsibility. Your proactive approach and commitment to green investments are commendable. We encourage maintaining this momentum, while continuing to enhance transparency and explore innovative ESG initiatives to solidify your leadership in the industry.";
    
    case "AA":
      return "The company has demonstrated strong ESG performance, achieving industry-leading standards. However, there is still potential for further growth. Strengthening internal governance, especially in environmental management and social responsibility, and aligning more closely with international best practices will drive even greater impact.";
    
    case "A":
      return "The company has made solid strides in ESG, but there are opportunities to enhance key areas. Focusing on increasing investments in environmental programs, improving corporate governance, and strengthening communication with stakeholders will help elevate your ESG performance and ensure long-term success.";
    
    case "BBB":
      return "The company shows good potential in ESG, with several areas for improvement. We recommend increasing focus on environmental protection initiatives, enhancing social responsibility programs, and refining governance structures, particularly around transparency and compliance, to boost overall ESG performance.";
    
    case "BB":
      return "The company has room for growth in its ESG performance. A comprehensive ESG assessment and targeted actions to enhance environmental management, strengthen social responsibility efforts, and improve governance practices will help drive meaningful improvements.";
    
    case "B":
      return "The company has significant opportunities to improve ESG performance. We recommend initiating a comprehensive ESG reform plan, focusing on building robust systems in environmental management, social responsibility, and governance to mitigate risks and strengthen sustainability efforts.";
    
    case "CCC":
      return "The company faces considerable challenges in ESG performance and has substantial room for improvement. We recommend prioritizing the development and implementation of a comprehensive ESG enhancement plan, with a focus on improving environmental practices, labor rights, and governance frameworks to address these critical areas.";

    default:
      return "Loading...";
  }
};

const getDimensionLevel = (score: number) => {
  if (score >= 6 && score <= 10) return "Excellent";
  if (score >= 3 && score < 6) return "Good";
  return "To be improved";
};

const getDimensionRecommendation = (dimension: string, score: number) => {
  switch (dimension) {
    case "environment":
      if (score >= 6) 
        return "The excellent environmental score is a testament to the company’s outstanding commitment to sustainability and responsible resource management. Your proactive approach sets a strong example, and we encourage continuing to build on these impressive efforts, exploring innovative green initiatives that can further enhance environmental impact and inspire industry-wide leadership.";
      if (score >= 3) 
        return "The environmental score is solid, indicating good progress. However, there is room to further invest in advanced technologies and enhance sustainable practices.";
      return "There is significant potential to improve environmental performance. Focus on energy reduction, waste management, and enhancing transparency in environmental practices.";
    
    case "social":
      if (score >= 6) 
        return "The company demonstrates a strong commitment to social responsibility and employee welfare. Continuing to expand these efforts will help drive long-term positive impact.";
      if (score >= 3) 
        return "The company has made solid progress in social responsibility but should focus on improving employee health and safety, and addressing key social issues to strengthen its corporate image.";
      return "There is significant room to enhance social responsibility efforts. Consider prioritizing staff training and supporting underserved communities, which would elevate the company’s social impact.";
    
    case "governance":
      if (score >= 6) 
        return "The governance score is excellent, with a well-established structure and strong policies. Maintaining these standards while exploring innovation will ensure continued success.";
      if (score >= 3) 
        return "The governance structure is generally sound, but there is potential for improvement. We recommend enhancing transparency, strengthening internal controls, and refining the compliance framework.";
      return "Governance practices could be further strengthened. Focus on enhancing internal controls, increasing board independence, and improving information disclosure to build stronger governance.";
    
      default:
      return "";
  }
};

const ESGScoreComponent: React.FC<ESGScoreProps> = ({
  rating,
  overallScore,
  environmentScore,
  socialScore,
  governanceScore,
}) => {
  // 获取得分等级和建议
  const overallRecommendation = getLevelRecommendation(rating);

  const environmentLevel = getDimensionLevel(environmentScore);
  const socialLevel = getDimensionLevel(socialScore);
  const governanceLevel = getDimensionLevel(governanceScore);

  const environmentRecommendation = getDimensionRecommendation("environment", environmentScore);
  const socialRecommendation = getDimensionRecommendation("social", socialScore);
  const governanceRecommendation = getDimensionRecommendation("governance", governanceScore);

  // 夸赞维度得分最高的部分
  const bestDimension = Math.max(environmentScore, socialScore, governanceScore);
  let praise = "";
  if (bestDimension === environmentScore) {
    praise = "The company is to be commended for its outstanding environmental performance. It has demonstrated excellent leadership in areas such as energy consumption and waste management. These achievements demonstrate the company's strong commitment to sustainable development and environmental protection and set a good example.";
  } else if (bestDimension === socialScore) {
    praise = "The Company is to be commended for its excellent performance in social responsibility! The Company's positive attitude and continued commitment in fulfilling its social responsibility demonstrates its deep concern for its employees, the community and society as a whole.";
  } else if (bestDimension === governanceScore) {
    praise = "The company is to be commended for doing a good job with its governance structure!The Company has successfully established a robust governance framework through transparent decision-making processes, a well-defined organizational structure and an efficient management team. The Company has successfully established a robust governance framework.This not only ensures the operational efficiency of the Company but also provides a guarantee of trust to shareholders, employees, customers and other stakeholders. This not only ensures the operational efficiency of the Company, but also provides a guarantee of trust for shareholders, employees, customers and other stakeholders, and demonstrates a high level of responsibility for governance in promoting the long-term health of the business.";
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* 总体评估部分 */}
      <div style={{ marginBottom: '20px'}}>
        <h3>
            <span style={{ color: '#7FF000' }}>
            <FaThumbsUp /> 
            Overall: {rating}
            </span>
        </h3>
        <p>{overallRecommendation}</p>
      </div>

      {/* 环境评估部分 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>
            <span style={{ color: '#7FF000' }}>
            <FaTree /> 
            Environment: {environmentLevel}
            </span>
        </h3>
        <ul>
          <li><strong>Advice(1): </strong>{environmentRecommendation}</li>
        </ul>
      </div>

      {/* 社会评估部分 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>
            <span style={{ color: '#7FF000' }}>
            <FaUsers /> 
            Social: {socialLevel}
            </span>
        </h3>
        <ul>
          <li><strong>Advice(2): </strong>{socialRecommendation}</li>
        </ul>
      </div>

      {/* 治理评估部分 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>
            <span style={{ color: '#7FF000' }}>
            <FaGavel /> 
            Governance: {governanceLevel}
            </span>
            </h3>
        <ul>
          <li><strong>Advice(3): </strong>{governanceRecommendation}</li>
        </ul>
      </div>

      {/* 赞扬部分 */}
      <div>
        <h3>
            <span style={{ color: '#7FF000' }}>
            <FaThumbsUp /> Good Job!
            </span>
            </h3>
        <p>{praise}</p>
      </div>
    </div>
  );
};



export default ESGScoreComponent;