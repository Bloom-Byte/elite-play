import { useState } from 'react';
import './ReferralSection.css';
import { useAppContext } from '../hooks/useAppContext';
import { useCopyToClipboard } from '../hooks/useCopy';
import { Divider } from '@chakra-ui/react';

const ReferralSection = ({ referralInfo, referralCount }) => {
  const [terms, setTerms] = useState(false);

  const { state } = useAppContext();

  const copyToClipboard = useCopyToClipboard();

  return (
    <>
      <div
        className={`referral-section`}
      >
        <p className="refer-dashboard">Referral Dashboard</p>
        <div className="referral-details">
          <div className="referralpot">
            <div className="referralpota">
              <img src="./pot-coin.svg" alt="coin-icon" />
              <div className="referralpota-txt">
                <span>Total Rewards</span>
                <span>eGold {state.user?.totalReferralEarnings || '0.00'}</span>
              </div>
            </div>
            <Divider orientation="vertical" />
            <div className="referralpotb">
              <img src="./speaker.svg" alt="speaker" />
              <div className="referralpotb-txt">
                <span>Total Friends</span>
                <span>{referralCount ? referralCount.count : 0}</span>
              </div>
            </div>
          </div>
          <div className="referralvalue">
            <div className="referralvalue-txt">
              <span>Available Rewards</span>
              <span>eGold 0.00</span>
            </div>
            <div className="referral-btn">
              <button>Withdraw to Wallet</button>
            </div>
          </div>
        </div>
        <div className="refer-invite">
          <div className="refer-invite-txt">
            <span>INVITE A FRIEND TO GET</span>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => setTerms(!terms)}
            >
              Referral Terms & Conditions
            </span>
          </div>
          <Divider mt={2} />
          <p className="refer-commissionrewards">
            <span className="percentagecommission">25%</span> Commission Rewards
          </p>
          <p className="pinfo">
            Get up to 25% commission of casino profit from referrals. Enjoy
            consistent commissions, when they win, in our Casino. Start earning
            now!
          </p>
        </div>
        <div className="referral-cta">
          <div className="referral-cta_boxes">
            <div className="referral-cta_box refer-url-box">
              <p>Referral Link</p>
              <div className="referral-cta_box-info">
                <img src="./link-02.svg" alt="link-icon" />
                <span>{referralInfo?.fullReferralUrl}</span>
                <img
                  onClick={() => {
                    copyToClipboard(referralInfo?.fullReferralUrl);
                  }}
                  src="./copy-01.svg"
                  alt="copy-icon"
                />
              </div>
            </div>
            <div
              className="referral-cta_box refer-code-box"
            >
              <p>Referral Code</p>
              <div
                style={{ width: '90%', justifyContent: 'space-between' }}
                className="referral-cta_box-info"
              >
                <img
                  src="./tag-01.svg"
                  alt="tag-icon"
                />
                <span>
                  {referralInfo ? referralInfo.referralCode : 'yuxeer'}
                </span>

                <img
                  onClick={() => {
                    copyToClipboard(
                      `${referralInfo ? referralInfo.referralCode : 'yuxeer'}`
                    );
                  }}
                  src="./copy-01.svg"
                  alt="copy-icon"
                />
              </div>
            </div>
          </div>
          <div className="share-refer-link">
            <span>Share via social media</span>
            <img src="./share-tw.svg" alt="twitter-icon" />
            <img src="./share-ig.svg" alt="ig-icon" />
            <a href={`whatsapp://send?text=${referralInfo?.fullReferralUrl}`}>
              <img src="./share-wa.svg" alt="whatsapp-icon" />
            </a>
            <img src="./share-te.svg" alt="telegram-icon" />
            <img src="./share-ds.svg" alt="discord-icon" />
          </div>
        </div>
      </div>
      {terms && (
        <div className="terms-popup">
          <div className="terms-popup_container">
            <div className="terms-popup_header">
              <p>Referral Terms & Conditions</p>
              <span
                onClick={() => {
                  setTerms(!terms);
                }}
                className="close terms-close"
              >
                X
              </span>
            </div>
            <div className="terms-popup_main-content">
              <div className="self-exclusion_container">
                <p>
                  The website is supported by the BC.GAME prediction platform.
                  Platform games include Crash, Classic Dice and so on. By
                  completing the BC.GAME Affiliate Program (the &quot;Affiliate
                  Program&quot;) application and clicking &quot;I agree to the Terms and
                  Conditions (the “Terms”)” within the registration form, you
                  (hereinafter the &quot;Affiliate&quot;) hereby agree to abide by all the
                  terms and conditions set out in this agreement. The commission
                  structure of the &quot;commission rules&quot; is also an integral part
                  of this agreement. BC.GAME reserves the right to amend, alter,
                  delete or extend any provisions of this agreement, at any time
                  and at its sole discretion, without giving any advance notice
                  to the Affiliate subject to the Terms set out in this
                  agreement. You hereby agree to: 1. Participate in the
                  Affiliate Program 2. Use of the BC.GAME affiliate website
                  and/or BC.GAME marketing tools (as hereafter defined). 3. The
                  condition that the acceptance of any affiliate commissions
                  from BC.GAME confirms your irrevocable acceptance of this
                  Agreement and any modifications thereto. Therefore you shall
                  be obliged to continuously comply with the Terms of this
                  Agreement as well as to comply with the General Terms and
                  Conditions and Privacy Policy of the website BC.GAME, as well
                  as with any other rules and/or guidelines brought forward from
                  time to time. An Agreement between the Company and the
                  Affiliate comes into effect on the date the affiliate
                  application is approved. 1. Purpose 1.1. The Affiliate
                  maintains and operates one or more websites on the Internet
                  (hereinafter collectively referred to as &quot;the Website&quot;),
                  and/or refers potential customers through other channels. 1.2.
                  This Agreement governs the terms and conditions which are
                  related to the promotion of the website BC.GAME by the
                  Affiliate, hereinafter referred to as &quot;BC.GAME&quot;, whereby the
                  Affiliate will be paid a commission as defined in this
                  Agreement depending on the traffic sent to BC.GAME and the
                  terms of this Agreement. 1.3. The definition of the term Net
                  Gaming Revenue can be found within Article 20 of this
                  Agreement. In case of an introduction of another product, or
                  group of products in the future, BC.GAME reserves the right to
                  use an individual definition of the term Net Gaming Revenue
                  for each product. 2. Acceptance of an Affiliate 2.1. The
                  Company reserves the right to refuse any registration in its
                  sole and absolute discretion. 3. Qualifying Conditions a) Is
                  of legal age in the applicable jurisdiction in order to agree
                  to and to enter into an Agreement. b) Is competent and duly
                  authorized to enter into binding Agreements. c) Is the
                  proprietor of all rights, licences and permits to market,
                  promote and advertise BC.GAME in accordance with the
                  provisions of this Agreement. d) Will comply with all
                  applicable rules, laws and regulations in correlation with the
                  promotion of BC.GAME. e) Fully understands and accepts the
                  Terms of the Agreement. 4. Responsibilities and Obligations of
                  the Company 4.1. The Company shall provide the Affiliate with
                  all required information and marketing material for the
                  implementation of the tracking link. 4.2. The Company shall
                  administrate the turnover generated via the tracking links,
                  record the revenue and the total amount of commission earned
                  via the link, provide the Affiliate with commission
                  statistics, and handle all customer services related to the
                  business. A unique tracking identification code will be
                  assigned to all referred customers. 4.3. The Company shall pay
                  the Affiliate the amount due depending on the traffic
                  generated subject to the Terms of this Agreement. 5.
                  Responsibilities and Obligations of the Affiliate a) To use
                  its best efforts to actively and effectively advertise, market
                  and promote BC.GAME as widely as possible in order to maximize
                  the benefit to the parties and to abide by the guidelines of
                  the Company as they may be brought forward from time to time
                  and/or as being published online. b) To market and refer
                  potential players to host at its own cost and expense. The
                  Affiliate will be solely responsible for the distribution,
                  content and manners of its marketing activities. All of the
                  Affiliate&apos;s marketing activities must be professional, proper
                  and lawful under applicable laws and must be in accordance
                  with this Agreement. c) To use only the tracking link provided
                  within the scope of the affiliate program, otherwise no
                  guarantee whatsoever can be given for proper registration and
                  sales accounting. Also, not to change or modify in any way any
                  link or marketing material without prior written authorization
                  from the Company. d) To be responsible for the development,
                  operation and maintenance of its website as well as for all
                  material appearing on its website. a) That it will not perform
                  any act which is libelous, discriminatory, obscene, unlawful
                  or otherwise unsuitable or which contains sexually explicit,
                  pornographic, obscene or graphically violent materials. b)
                  That it will not actively target any person who is under the
                  legal age for gambling. c) That it will not actively target
                  any jurisdiction where gambling and the promotion thereof is
                  illegal. d) That it will not generate traffic to BC.GAME by
                  illegal or fraudulent activity, particularly but not limited
                  to: I. Sending spam. II. Incorrect metatags. III. Registering
                  as a player or making deposits directly or indirectly to any
                  player account through his/her tracker(s) for their own
                  personal use and/or the use of its relatives, friends,
                  employees or other third parties, or in any other way attempt
                  to artificially increase the commission payable or to
                  otherwise defraud the Company. Violation of this provision
                  shall be deemed to be fraud. e) That it will not present its
                  website in such a way that it might evoke any risk of
                  confusion with BC.GAME and/or the Company and or convey the
                  impression that the website of the contracting party is partly
                  or fully originated with BC.GAME and/or the Company. f)
                  Without prejudice to the marketing material as may be
                  forwarded by the Company and/or made available online through
                  the website https://bc.game/ the affiliate may not use BC.GAME
                  or other terms, trademarks and other intellectual property
                  rights that are vested in the Company unless the Company
                  consents to such use in writing. 6. Payment 6.1. The Company
                  agrees to pay the Affiliate a commission based on the Game bet
                  amount generated from new customers referred by the
                  Affiliate’s website and/or other channel. New customers are
                  those customers of the Company who do not yet have a gaming
                  account and who access the Website via the tracking link and
                  who properly register and make bitcoin transfers at least
                  equivalent to the minimum deposit into their BC.GAME betting
                  account. The commission shall be deemed to be inclusive of
                  value added tax or any other tax if applicable. 6.2. The
                  commission shall be a percentage of the Game bet amount in
                  accordance with what is set out in the commission structures
                  for the particular product. The calculation is product
                  specific and it is set out in every product-specific
                  commission structure. (see &quot;commission rules&quot; for details)
                  6.3. Users can withdraw commissions from the agent system at
                  any time. The commissions will be withdrawn into the platform
                  wallet. Users can also withdraw the platform wallet to any
                  address at any time. (you can check the Commission extraction
                  in the agent system and view transaction records in the
                  platform wallet). 6.4. The commissions will be collected in
                  digital currency and will only be received on the platform
                  wallet.When applying for Withdraw, you must submit the correct
                  wallet address on the “Withdraw” page.If there is an error in
                  calculating the commission, the company has the right to amend
                  the amount at any time and immediately settle the underpaid
                  difference to the agent or recover the overpaid balance from
                  the agent. 6.5. Agent Withdraw commission by the Affiliate
                  shall be deemed to be full and the final settlement of the
                  balance due for the period indicated. 6.6. If the Affiliate
                  disagrees with the balance due as reported, it shall within a
                  period of seven (7) days send an email to the Company to
                  admin@BC.GAME and indicate the reasons for the dispute. Or
                  contact customer service through Telegram .Failure to send an
                  email Or contact customer service through Telegram within the
                  prescribed time limit shall be deemed to be considered as an
                  irrevocable acknowledgment of the balance due for the period
                  indicated. 6.7. May delay the Withdrawal request through the
                  agent for up to sixty (60) days, while it investigates and
                  verifies that the relevant transactions comply with the
                  provisions of the Terms. 6.8. No payment shall be due when the
                  traffic generated is illegal or contravenes any provision of
                  these Terms. 6.9. The Affiliate agrees to return all
                  commissions received based on fraudulent or falsified
                  transactions, plus all costs for legal causes or actions that
                  may be brought against the Affiliate to the fullest extent of
                  the law. 6.10. For the sake of clarity the parties
                  specifically agree that upon termination of this Agreement by
                  either party, In addition to the previous unsettled
                  Commissions, the Commissions of the agent will no longer be
                  settled. 6.11. The Affiliate shall be exclusively responsible
                  for the payment of any and all taxes, levies, fees, charges
                  and any other money payable or due both locally and abroad (if
                  any) to any tax authority, department or other competent
                  entity by the Affiliate as a result of the commission
                  generated under this Agreement. The Company shall in no manner
                  whatsoever be held liable for any amounts unpaid but found to
                  be due by the Affiliate and the Affiliate hereby indemnifies
                  the Company in that regard. 7. Termination 7.1. This Agreement
                  may be terminated by either party by giving a thirty (30) day
                  written notification to the other party. Written notification
                  may be given by email. a) The Affiliate must remove all
                  references to BC.GAME from the Affiliate&apos;s websites and/or
                  other marketing channels and communications, irrespective of
                  whether the communications are commercial or non-commercial.
                  b) All rights and licenses granted to the Affiliate under this
                  Agreement shall immediately terminate and all rights shall
                  revert to the respective licensors, and the Affiliate will
                  cease the use of any trademarks, service marks, logos and
                  other designations vested in the Company. c) The Affiliate
                  will be entitled only to those earned and unpaid commissions
                  as of the effective date of termination;however provided, the
                  Company may withhold the Affiliate&apos;s final payment for a
                  reasonable time to ensure that the correct amount is paid. The
                  Affiliate will not be eligible to earn or receive commissions
                  after this termination date. d) If this Agreement is
                  terminated by the Company on the basis of the Affiliate&apos;s
                  breach, the Company shall be entitled to withhold the
                  Affiliate’s earned but unpaid commissions as of the
                  termination date as collateral for any claim arising from such
                  a breach. It is further specified that termination by the
                  Company due to a breach by the Affiliate of any of the clauses
                  in this Agreement shall not require a notice period and such
                  termination shall have immediate effect upon simple
                  notification by the Company to the Affiliate. e) The Affiliate
                  must return to the Company any and all confidential
                  information (and all copies and derivations thereof) in the
                  Affiliate&apos;s possession, custody and control. f) The Affiliate
                  will release the Company from all obligations and liabilities
                  occurring or arising after the date of such a termination,
                  except with respect to those obligations that by their nature
                  are designed to survive termination. Termination will not
                  relieve the Affiliate from any liability arising from any
                  breach of this Agreement, which occurred prior to termination
                  and/or to any liability arising from any breach of
                  confidential information even if the breach arises at any time
                  following the termination of this Agreement. The Affiliate’s
                  obligation of confidentiality towards the Company shall
                  survive the termination of this Agreement. 8. Warranties 8.1.
                  The Affiliate expressly acknowledges and agrees that the use
                  of the Internet is at its own risk and that this affiliate
                  program is provided &quot;as is&quot; and &quot;as available&quot; without any
                  warranties or conditions whatsoever, even if expressed or
                  implied. No guarantee is made that it will make access to its
                  website possible at any particular time or any particular
                  location. 8.2. The Company shall in no event be liable to the
                  Affiliate or anyone else for any inaccuracy, error or omission
                  in, or loss, injury or damage caused in whole or in part by
                  failures, delays or interruptions of the BC.GAME website or
                  the affiliate program. a) Any breach of the Affiliate&apos;s
                  representations, warranties or covenants under this Agreement.
                  b) The Affiliate&apos;s use (or misuse) of the marketing materials.
                  c) All conduct and activities occurring under the Affiliate&apos;s
                  user ID and password. d) Any defamatory, libelous or illegal
                  material contained within the Affiliate’s website or as part
                  of the Affiliate&apos;s information and data. e) Any claim or
                  contention that the Affiliate’s website or the Affiliate&apos;s
                  information and data infringes any third party&apos;s patent,
                  copyright, trademark, or other intellectual property rights or
                  violates any third party&apos;s rights of privacy or publicity. f)
                  Third party access or use of the Affiliate’s website or to the
                  Affiliate&apos;s information and data. g) Any claim related to the
                  Affiliate website. h) Any violation of this Agreement. 9.2.
                  The Company reserves the right to participate, at its own
                  expense in the defense of any matter. 10. Company Rights 10.1.
                  In order to comply with company or BC.GAME policies, and to
                  protect the company or BC.GAME&apos;s interests, the company or
                  BC.GAME can reject any player or close the player account.
                  10.2. The Company may refuse any applicant and/or may close
                  any Affiliate’s account if it is necessary to comply with the
                  Company&apos;s policy and/or protect the interest of the Company.
                  If the Affiliate is in breach of this Agreement or the
                  Company’s Terms or other rules, policies and guidelines of the
                  Company, the Company may besides closing the Affiliate’s
                  account take any other steps in law to protect its interests.
                  11. Commission structure 11.1. The commission settled to the
                  agent is a percentage of the game betting amount.The exact
                  commission structure is part of this agreement. For details,
                  see the &quot;commission rules&quot; clause.In this case, the Commission
                  is withdrawn to the player’s platform wallet (digital
                  currency), but not directly to other addresses. 12. Assignment
                  12.1. The Affiliate may not assign this Agreement, by
                  operation of law or otherwise, without obtaining the prior
                  written consent of the Company. In the event that the
                  affiliate acquires or otherwise obtains control of another
                  affiliate of BC.GAME, then accounts will coexist on individual
                  terms. 12.2. The Company may assign this Agreement, by
                  operation of the law or otherwise, at any time without
                  obtaining the prior consent of the Affiliate. 13. Non-Waiver
                  13.1. The Company&apos;s failure to enforce the Affiliate&apos;s
                  adherence to the Terms outlined in this Agreement shall not
                  constitute a waiver of the right of the Company to enforce
                  said terms at any time. 14. Force Majeure 14.1. Neither party
                  shall be liable to the other for any delay or failure to
                  perform its obligations under this Agreement if such delay or
                  failure arises from a cause beyond the reasonable control of
                  and is not the fault of such party, including but not limited
                  to labour disputes, strikes, industrial disturbances, acts of
                  God, acts of terrorism, floods, lightning, utility or
                  communications failures, earthquakes or other casualty. If a
                  force majeure event occurs, the non-performing party is
                  excused from whatever performance is prevented by the force
                  majeure event to the extent prevented. Provided that, if the
                  force majeure event subsists for a period exceeding thirty
                  (30) days then either party may terminate the Agreement
                  without notice. 15. Relationship of the Parties 15.1. Nothing
                  contained in this Agreement, nor any action taken by any party
                  to this Agreement, shall be deemed to constitute either party
                  (or any of such party&apos;s employees, agents, or representatives)
                  an employee, or legal representative of the other party, nor
                  to create any partnership, joint venture, association, or
                  syndication among or between the parties, nor to confer on
                  either party any express or implied right, power or authority
                  to enter into any Agreement or commitment on behalf of (nor to
                  impose any obligation upon) the other party. 16.
                  Severability/Waiver 16.1. Whenever possible, each provision of
                  this Agreement shall be interpreted in such a manner as to be
                  effective and valid under applicable law but, if any provision
                  of this Agreement is held to be invalid, illegal or
                  unenforceable in any respect, such provision will be
                  ineffective only to the extent of such invalidity, or
                  unenforceability, without invalidating the remainder of this
                  Agreement. No waiver will be implied from conduct or failure
                  to enforce any rights and must be in writing to be effective.
                  17. Confidentiality 17.1. All information, including but not
                  limited to business and financial, lists of customers and
                  buyers, as well as price and sales information and any
                  information relating to products, records, operations,
                  business plans, processes, product information, business
                  know-how or logic, trade secrets, market opportunities and
                  personal data of the Company shall be treated confidentially.
                  Such information must not be used for own commercial or other
                  purposes or divulged to any person or third party neither
                  directly nor indirectly unless prior explicit and written
                  consent has been provided by the Company. This provision shall
                  survive the termination of this Agreement. 17.2. The Affiliate
                  obliges himself/herself not to use the confidential
                  information for any purpose other than the performance of its
                  obligations under this Agreement. 18. Changes to this
                  Agreement 18.1. The Company reserves the right to amend,
                  alter, delete or add to any of the provisions of this
                  Agreement, at any time and at its sole discretion, without
                  giving any advance notice to the Affiliate subject to the
                  Terms set out in this Agreement. Any such changes will be
                  published on BC.GAME. 18.2. In case of any discrepancy between
                  the meanings of any translated versions of this Agreement, the
                  English language version shall prevail. 19. Trademarks 19.1.
                  Nothing contained in this Agreement will grant either party
                  any right, title or interest in the trademarks, trade names,
                  service marks or other intellectual property rights
                  [hereinafter referred to simply as ‘Marks’] of the other
                  party. At no time during or after the term will either party
                  attempt or challenge or assist or allow others to challenge or
                  to register or to attempt to register the Marks of the other
                  party or of any company within the group of companies of the
                  other party. Provided also that neither of the parties will
                  register nor attempt to register any Mark which is basically
                  similar to and/or confusingly similar to any Mark which
                  belongs to the other party or to any company contained within
                  the other party’s group of companies. Casino Sports Racing
                  Lottery $0.00 Deposit 5 $ USD Bonus QUEST SPIN Refer and Earn
                  Casino Sports Racing Lottery Bingo Up Down Promotions VIPClub
                  Affiliate Forum Provably Fair Blog Sport Betting Insights
                  Sponsorships Live Support DarkLight Affiliate Dashboard My
                  Rewards Referral Codes & Friends Rate & Rules Download Banners
                  Referral Terms & Conditions INVITE A FRIEND TO GET
                  $1,000.00Referral Bonus 25%Commission Rewards Get $1,000.00
                  for each friend you invite, plus a up to 25% commission on
                  their wagers. Enjoy consistent commissions, whether they win
                  or lose, in our Casino and Sportsbook. Start earning now!
                  Referral Link https://bc.game/i-froq82o2-n/ Referral Code
                  froq82o2 Share via social media Total Rewards $0.00 Total
                  Friends 0 Referral Rewards $0.00 Commission Rewards $0.00
                  Rewards Activities
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReferralSection;
