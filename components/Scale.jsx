/* eslint-disable react/prop-types */
export default function Scale() {
  let stripes_num = [0, 1, 0, 1, 0, 1, 0, 1, 0];
  // let strokeWidth = props.strokeWidth;
  // let white = props.colors.white;
  // let offwhite = props.colors.offwhite;
  // let primary = props.colors.primary;
  return (
    <div className="score_scale">
      {stripes_num.map((stripe_num, index) =>
        stripe_num > 0 ? (
          <div key={index} className="score_scale_stripe"></div>
        ) : (
          <div key={index} className="score_scale_stripe-dark"></div>
        )
      )}
    </div>
  );
}
